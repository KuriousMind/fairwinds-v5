"use client";

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getAllMakes, getModelsByMake, getYears } from '@/lib/data/rvData';

interface RVFormInputs {
  make: string;
  model: string;
  year: number;
  vin?: string;
  notes?: string;
}

interface RVProfileFormProps {
  initialData?: Partial<RVFormInputs>;
  onSubmit: SubmitHandler<RVFormInputs>;
  isLoading?: boolean;
}

export const RVProfileForm = ({
  initialData,
  onSubmit,
  isLoading = false,
}: RVProfileFormProps) => {
  const router = useRouter();
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<RVFormInputs>({
    defaultValues: initialData || {
      make: '',
      model: '',
      year: new Date().getFullYear(),
    },
  });

  const selectedMake = watch('make');
  
  // Update available models when make changes
  useEffect(() => {
    if (selectedMake) {
      setAvailableModels(getModelsByMake(selectedMake));
    } else {
      setAvailableModels([]);
    }
  }, [selectedMake]);

  // Set model to empty if make changes and current model is not available
  useEffect(() => {
    if (selectedMake && !availableModels.includes(watch('model'))) {
      setValue('model', '');
    }
  }, [availableModels, selectedMake, setValue, watch]);

  const makes = getAllMakes();
  const years = getYears();

  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
      <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-[#1D3557] mb-4">
          {initialData ? 'Edit RV Details' : 'Add Your RV'}
        </h2>
        
        <div className="space-y-2">
          <label htmlFor="make" className="block text-[#1D3557] font-medium">
            Make <span className="text-red-500">*</span>
          </label>
          <select
            id="make"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
            {...register('make', { required: 'Make is required' })}
            disabled={isLoading}
          >
            <option value="">Select Make</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
          {errors.make && (
            <p className="text-red-500 text-sm">{errors.make.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="model" className="block text-[#1D3557] font-medium">
            Model <span className="text-red-500">*</span>
          </label>
          <select
            id="model"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
            {...register('model', { required: 'Model is required' })}
            disabled={isLoading || !selectedMake}
          >
            <option value="">Select Model</option>
            {availableModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          {errors.model && (
            <p className="text-red-500 text-sm">{errors.model.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="year" className="block text-[#1D3557] font-medium">
            Year <span className="text-red-500">*</span>
          </label>
          <select
            id="year"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
            {...register('year', { required: 'Year is required' })}
            disabled={isLoading}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.year && (
            <p className="text-red-500 text-sm">{errors.year.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="vin" className="block text-[#1D3557] font-medium">
            VIN (Optional)
          </label>
          <input
            id="vin"
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
            {...register('vin')}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="block text-[#1D3557] font-medium">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
            {...register('notes')}
            disabled={isLoading}
          ></textarea>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-200 text-[#1D3557] rounded hover:bg-gray-300 transition-colors"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#2B6CB0] text-white rounded hover:bg-[#1e5a9a] transition-colors flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            'Save RV Details'
          )}
        </button>
      </div>
    </form>
  );
};
