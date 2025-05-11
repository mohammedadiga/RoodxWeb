'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Modules
import { ForgotEmailForm } from '@/modules/auth/password/forgot-email-form';
import { ForgotCodeForm } from '@/modules/auth/password/forgot-code-form';
import { ForgotResetForm } from '@/modules/auth/password/forgot-reset-form';

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const goToStep = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };

  const steps = [
    <ForgotEmailForm key="email" onNext={nextStep} />,
    <ForgotCodeForm key="code" onNext={nextStep} onBack={() => goToStep(0)} />,
    <ForgotResetForm key="reset" onNext={nextStep} onBack={() => goToStep(0)} />,
  ];
  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {steps[step]}
      </motion.div>
    </AnimatePresence>
  );
}
