'use client';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import CurrencyCalculator from '@/components/CurrencyCalculator';
import { ThemeProvider } from '@/context/ThemeContext';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <CurrencyCalculator initialSession={session} />
      )}
    </ThemeProvider>
  );
}
