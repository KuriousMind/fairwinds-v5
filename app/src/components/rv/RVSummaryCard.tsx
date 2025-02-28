"use client";

import { Card } from '@/components/common/ui/Card';
import { RV } from '@/types/models';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface RVSummaryCardProps {
  rv?: RV | null;
  loading?: boolean;
}

export const RVSummaryCard = ({ rv, loading = false }: RVSummaryCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (rv) {
      router.push('/rv/profile');
    } else {
      router.push('/rv/new');
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </Card>
    );
  }

  return (
    <Card onClick={handleClick} className="transition-all hover:translate-y-[-2px]">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-1/3 aspect-video relative rounded overflow-hidden bg-gray-100">
          {rv?.photos && rv.photos.length > 0 ? (
            <Image
              src={rv.photos[0]}
              alt={`${rv.make} ${rv.model}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400">No photo</span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          {rv ? (
            <>
              <h3 className="text-xl font-bold text-[#1D3557]">
                {rv.make} {rv.model}
              </h3>
              <p className="text-[#1D3557]">Year: {rv.year}</p>
              {rv.vin && <p className="text-sm text-gray-600">VIN: {rv.vin}</p>}
              <div className="mt-2">
                <span className="inline-block bg-[#2A9D8F] text-white text-sm px-2 py-1 rounded">
                  View Details
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <h3 className="text-xl font-bold text-[#1D3557] mb-2">No RV Added Yet</h3>
              <p className="text-[#1D3557] mb-4">Add your RV details to get started</p>
              <span className="inline-block bg-[#E76F51] text-white px-3 py-2 rounded">
                Add RV
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
