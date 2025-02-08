"use client";

import Header from "@/components/header";
import { SubscriptionButton } from "@/components/subscribebtn";
import { SignOutButton } from "@clerk/nextjs";

export default function Settings() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
      {/* Header */}
      <Header />

      {/* Content Wrapper */}
      <div className="flex flex-col items-center w-full max-w-xl px-6 py-8 mt-6 space-y-6 bg-white rounded-lg shadow-lg sm:px-10 md:px-14 lg:px-16">
        
        {/* Subscription Section */}
        <div className="w-full space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Manage Your Subscription
          </h2>
          <p className="text-center text-gray-500">
            Upgrade to unlock more features and exclusive content.
          </p>
          <SubscriptionButton />
        </div>

        {/* Account Settings Section */}
        <div className="w-full space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Account Settings
          </h2>
          <div className="flex justify-center">
            <SignOutButton>
              <button className="py-2 px-6 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500 transition-colors duration-150 ease-in-out">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
