"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/common/layout/DashboardLayout';
import { PhotoUpload } from '@/components/rv/PhotoUpload';
import { Card } from '@/components/common/ui/Card';
import { ErrorBoundary } from '@/components/common/ui/ErrorBoundary';
import Image from 'next/image';

export default function RVPhotosPage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // For MVP, we're just simulating photo uploads
  // In a real app, we would upload photos to S3 or similar
  const handlePhotoUpload = async (file: File) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a local URL for the file
      const photoUrl = URL.createObjectURL(file);
      
      // Add the photo to the list
      setPhotos(prev => [...prev, photoUrl]);
    } catch (error) {
      console.error('Error uploading photo:', error);
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
    },
  ];

  return (
    <ErrorBoundary>
      <DashboardLayout 
        title="RV Photos" 
        navButtons={navButtons}
        showBackButton={true}
      >
        <div className="space-y-8">
          <PhotoUpload 
            onUpload={handlePhotoUpload}
            currentCount={photos.length}
            isLoading={isLoading}
          />
          
          {photos.length > 0 ? (
            <div>
              <h2 className="text-xl font-bold text-[#1D3557] mb-4">Your Photos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={photo}
                        alt={`RV Photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <div className="p-6 text-center">
                <p className="text-[#1D3557]">No photos yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Upload photos of your RV using the form above
                </p>
              </div>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  );
}
