"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/common/layout/DashboardLayout';
import { RVProfileForm } from '@/components/rv/RVProfileForm';
import { ErrorBoundary } from '@/components/common/ui/ErrorBoundary';
import { useRouter } from 'next/navigation';
import { RV } from '@/types/models';

export default function NewRVPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // For MVP, we're just simulating saving the RV data
  // In a real app, we would create the RV via API
  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new RV object with the form data
      const newRv: RV = {
        id: 'rv-' + Date.now(),
        ...data,
      };
      
      // In a real app, we would save this to the backend
      console.log('New RV created:', newRv);
      
      // Navigate to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating RV:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <DashboardLayout 
        title="Add Your RV" 
        showBackButton={true}
        backHref="/dashboard"
      >
        <div className="max-w-4xl mx-auto">
          <RVProfileForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  );
}
