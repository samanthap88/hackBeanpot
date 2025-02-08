"use client";

import { PropsWithChildren } from "react";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient("https://youthful-squirrel-12.convex.cloud")

export function Providers({children}: PropsWithChildren){
    return (
        <ClerkProvider publishableKey={"pk_live_Y2xlcmsuYWxvYW5nZWxzLm1lJA"}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}