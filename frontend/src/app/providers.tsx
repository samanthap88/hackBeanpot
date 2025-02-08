"use client";

import { PropsWithChildren } from "react";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient("https://disciplined-boar-119.convex.cloud")

export function Providers({children}: PropsWithChildren){
    return (
        <ClerkProvider publishableKey={"pk_test_Y3Jpc3AtbG9uZ2hvcm4tMzcuY2xlcmsuYWNjb3VudHMuZGV2JA"}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}