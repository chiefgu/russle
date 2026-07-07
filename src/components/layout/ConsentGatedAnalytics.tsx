'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';

const STORAGE_KEY = 'russle-cookie-consent-v1';
export const CONSENT_CHANGE_EVENT = 'russle-consent-change';

export function ConsentGatedAnalytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const read = () => setGranted(localStorage.getItem(STORAGE_KEY) === 'granted');
    read();
    window.addEventListener(CONSENT_CHANGE_EVENT, read);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, read);
  }, []);

  return granted ? <Analytics /> : null;
}
