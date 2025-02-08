import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  formvalues: defineTable({
    age: v.string(),
    income: v.string(),
    householdSize: v.string(),
    location: v.string(),
    employment: v.string(),
    userId: v.string(),
  }),
  investors: defineTable({
    data: v.string(),
    userId: v.string(),
  }),
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    subscriptionId: v.optional(v.string()),
    endsOn: v.optional(v.number()),
    credits: v.number(),
  })
  .index("by_userId", ["userId"])
  .index("by_subscriptionId", ["subscriptionId"])
});