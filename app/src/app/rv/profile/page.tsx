"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/common/layout/DashboardLayout';
import { RVProfileForm } from '@/components/rv/RVProfileForm';
import { ErrorBoundary } from '@/components/common/ui/ErrorBoundary';
import { LoadingState } from '@/components/common/ui/LoadingState';
import { useRouter } from 'next/navigation';
import { RV } from '@/types/models';

export default function RVProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rv, setRv] = useState<RV | null>(null);

  // For MVP, we're just simulating saving the RV data
  // In a real app, we would fetch and update the RV data via API
  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new RV object with the form data
      const newRv: RV = {
        id: rv?.id || 'rv-' + Date.now(),
        ...data,
      };
      
      // Update local state
      setRv(newRv);
      
      // Navigate back to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving RV:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navButtons = [
    {
      href: '/rv/profile',
      label: 'Profile',
    },
    {
      href: '/rv/photos',
      label: 'Photos',
      disabled: true, // Disabled for MVP
    },
  ];

  return (
    <ErrorBoundary>
      <DashboardLayout 
        title="RV Profile" 
        navButtons={navButtons}
        showBackButton={true}
      >
        <div className="max-w-4xl mx-auto">
          <RVProfileForm
            initialData={rv || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  );
}
