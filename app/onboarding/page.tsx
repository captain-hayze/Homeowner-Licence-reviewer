'use client';

import dynamic from 'next/dynamic';
 
const Onboarding = dynamic(
  () => import('@/components/auth/Onboarding'),
  { ssr: false })

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-50 h-full! flex items-center justify-center">
      <div className="w-full max-w-xl p-6">
        <Onboarding />
      </div>
      {/* <div className="hidden lg:block bg-green-600" /> */}
    </div>
  )
}
