"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/common/layout/DashboardLayout';
import { RVSummaryCard } from '@/components/rv/RVSummaryCard';
import { Card } from '@/components/common/ui/Card';
import { ErrorBoundary } from '@/components/common/ui/ErrorBoundary';
import { LoadingState } from '@/components/common/ui/LoadingState';
import { useAuth } from '@/context/auth/AuthContext';

export default function DashboardPage() {
  const { isLoading: authLoading } = useAuth();
  const [rv, setRv] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // For MVP, we're just showing a placeholder dashboard
  // In a real app, we would fetch the RV data from the API

  if (authLoading) {
    return <LoadingState text="Loading dashboard..." />;
  }

  return (
    <ErrorBoundary>
      <DashboardLayout title="Dashboard">
        <div className="space-y-6">
          <RVSummaryCard rv={rv} loading={isLoading} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Maintenance" className="h-full">
              <div className="p-4 bg-gray-100 rounded text-center">
                <p className="text-[#1D3557]">Coming Soon</p>
                <p className="text-sm text-gray-500 mt-2">
                  Track your RV maintenance records
                </p>
              </div>
            </Card>
            
            <Card title="Settings" className="h-full">
              <div className="p-4 bg-gray-100 rounded text-center">
                <p className="text-[#1D3557]">Coming Soon</p>
                <p className="text-sm text-gray-500 mt-2">
                  Customize your app preferences
                </p>
              </div>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  );
}
