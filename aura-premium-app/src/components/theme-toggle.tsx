'use client';

import { Moon, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (prefersDark) {
      root.classList.add('dark');
      setDark(true);
    }
    setMounted(true);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
    const isDark = root.classList.contains('dark');
    setDark(isDark);
  };

  if (!mounted) {
    return (
      <button
        className="h-11 w-11 rounded-full border border-white/20 bg-white/10"
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
    >
      {dark ? <SunMedium size={18} /> : <Moon size={18} />}
    </button>
  );
}
