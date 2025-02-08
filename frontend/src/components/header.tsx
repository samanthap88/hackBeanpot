import { Button } from '@/components/ui/button';
import { useAction } from 'convex/react';
import { api } from '../../convex/generated/api';
import { useRouter } from 'next/navigation';
import { Settings, SunIcon, MoonIcon, Menu, X } from 'lucide-react';
import { useDarkMode } from '@/app/DarkModeContext';
import { useQuery } from 'convex/react';
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';import { SubscriptionButton } from './subscribebtn';



import { Alert, AlertDescription } from '@/components/ui/alert';


export default function Header() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const startSubscription = useAction(api.stripe.pay);
  const router = useRouter();
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const user = useQuery(api.users.getUser);

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

  return (
    <div className={`px-4 sm:px-8 py-4 border-b-[1px] flex items-center justify-between w-full shadow-md ${
          isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"
        }`}>
      
      <div className="flex items-center gap-8">
        {/* Logo */}
        <p className="font-bold text-lg">VentureMate</p>

        <div className="hidden sm:flex gap-4">
          <Link href="/home" className="hover:underline hover:text-blue-500">Current Matches</Link>
          <Link href="/saved" className="hover:underline hover:text-blue-500">Previous Matches</Link>
          <Link href="/form" className="hover:underline hover:text-blue-500">New Search</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {!user?.subscriptionId && (
          <Button 
            onClick={handleSubscribe}
            disabled={loading}
            variant="outline"
            className="text-sm sm:text-base"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upgrade
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`rounded-full ${
            isDarkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              : "bg-white text-gray-900 hover:bg-gray-100"
          }`}
        >
          {isDarkMode ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </Button>

        <Link href="/settings" className="hidden sm:block text-gray-500 hover:text-gray-800">
          <Settings className="h-5 w-5" />
        </Link>

        <div className="sm:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      <div
        className={clsx(
          "fixed inset-0 z-40 transition-transform transform bg-black bg-opacity-50 sm:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-full w-3/4 max-w-sm bg-white p-6 text-gray-900 shadow-lg transform transition-transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col gap-4">
            <Link href="/home" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Current Matches</Link>
            <Link href="/saved" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Previous Matches</Link>
            <Link href="/form" className="hover:underline" onClick={() => setIsMenuOpen(false)}>New Search</Link>
            <Link href="/settings" className="text-gray-500 hover:text-gray-800 mt-4" onClick={() => setIsMenuOpen(false)}>
              <Settings className="h-5 w-5 inline mr-2" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
