import React from 'react';
import ReviewerLayout from '@/components/layouts/ReviewerLayout';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReviewerLayout>
      {children}
    </ReviewerLayout>
  )
}
