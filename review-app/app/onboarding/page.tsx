"use client"
import React from "react"
import Onboarding from "../../components/auth/Onboarding"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          <Onboarding />
        </div>
      </div>
      <div className="hidden lg:block bg-green-600" />
    </div>
  )
}
