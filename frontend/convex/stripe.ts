"use node";

import { v } from "convex/values";
import Stripe from "stripe";

import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

type Metadata = {
  userId: string;
};

type UserType = {
  _id: Id<"users">;
  userId: string;
  email: string;
  subscriptionId?: string;
  endsOn?: number;
  credits?: number;
};

export const pay = action({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("you must be logged in to subscribe");
    }

    if (!user.emailVerified) {
      throw new Error("you must have a verified email to subscribe");
    }

    const domain = process.env.HOSTING_URL ?? "http://localhost:3000";
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2024-09-30.acacia"
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: process.env.PRICE_ID!, quantity: 1 }],
      customer_email: user.email,
      metadata: {
        userId: user.subject,
      },
      mode: "subscription",
      success_url: `${domain}`,
      cancel_url: `${domain}`,
    });

    return session.url!;
  },
});

export const cancelSubscription:any = action({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("you must be logged in to cancel subscription");
    }

    const dbUser = await ctx.runQuery(internal.users.getUserInternal, {});

    if (!dbUser?.subscriptionId) {
      throw new Error("no active subscription found");
    }

    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2024-09-30.acacia",
    });

    try {
      const subscription = await stripe.subscriptions.update(
        dbUser.subscriptionId,
        {
          cancel_at_period_end: true,
        }
      );

      return {
        success: true,
        message: `Subscription will be canceled on ${new Date(
          subscription.current_period_end * 1000
        ).toLocaleDateString()}`,
      };
    } catch (error) {
      console.error("Error canceling subscription:", error);
      throw new Error("Failed to cancel subscription");
    }
  },
});

export const fulfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async (ctx, args) => {
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2024-09-30.acacia",
    });

    const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET!;
    try {
      const event = stripe.webhooks.constructEvent(
        args.payload,
        args.signature,
        webhookSecret
      );

      const completedEvent = event.data.object as Stripe.Checkout.Session & {
        metadata: Metadata;
      };

      if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
          completedEvent.subscription as string
        );

        const userId = completedEvent.metadata.userId;

        await ctx.runMutation(internal.users.updateSubscription, {
          userId,
          subscriptionId: subscription.id,
          endsOn: subscription.current_period_end * 1000,
        });

        await ctx.runMutation(internal.users.increaseCredits, {
          userId,
          amount: 10,
        });
      }

      if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
          completedEvent.subscription as string
        );

        await ctx.runMutation(internal.users.updateSubscriptionBySubId, {
          subscriptionId: subscription.items.data[0]?.price.id,
          endsOn: subscription.current_period_end * 1000,
        });

        const userId = completedEvent.customer as string;
        await ctx.runMutation(internal.users.increaseCredits, {
          userId,
          amount: 10,
        });
      }

      if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as Stripe.Subscription;
        const user = await ctx.runQuery(internal.users.getUserBySubscriptionId, {
          subscriptionId: subscription.id,
        });
        
        if (user) {
          await ctx.runMutation(internal.users.removeSubscription, {
            userId: user.userId,
          });
        }
      }

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: (err as { message: string }).message };
    }
  },
});