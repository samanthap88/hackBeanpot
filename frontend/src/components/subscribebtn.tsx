import React, { useState } from 'react';
import { useAction, useQuery } from 'convex/react';
import { api } from "../../convex/generated/api";
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export function SubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const user = useQuery(api.users.getUser);
  const startSubscription = useAction(api.stripe.pay);
  const cancelSubscription = useAction(api.stripe.cancelSubscription);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError('');
      setMessage('');
      
      const url = await startSubscription();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start subscription');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      setError('');
      setMessage('');
      
      const result = await cancelSubscription();
      if (result?.success) {
        setMessage(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6  space-y-6">
      {error && (
        <Alert variant="destructive" className="w-full p-3 bg-red-100 border-l-4 border-red-600 text-red-600">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {message && (
        <Alert className="w-full p-3 bg-green-100 border-l-4 border-green-600 text-green-600">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <Button 
          onClick={handleSubscribe}
          disabled={loading || user?.subscriptionId}
          className="w-full py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 transition duration-300 ease-in-out"
        >
          {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {user?.subscriptionId ? 'Subscribed' : 'Upgrade'}
        </Button>

        {user?.subscriptionId && (
          <Button 
            onClick={handleCancel}
            disabled={loading}
            variant="outline"
            className="w-full py-3 text-red-600 border-red-600 rounded-lg shadow-md hover:bg-red-50 transition duration-300 ease-in-out"
          >
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Cancel Subscription
          </Button>
        )}
      </div>

      {user?.subscriptionId && (
        <div className="pt-4 text-center">
          <div className="text-sm text-gray-500">Credits remaining: {user.credits}</div>
        </div>
      )}
    </div>
  );
}
