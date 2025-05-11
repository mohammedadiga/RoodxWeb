'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Icon
import { GalleryVerticalEnd } from 'lucide-react';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState(1); // 1 = forward, -1 = backward

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const goToStep = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img src="/placeholder.svg" alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                custom={direction}
                initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
