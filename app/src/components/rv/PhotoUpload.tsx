"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';

interface PhotoUploadProps {
  onUpload: (file: File) => Promise<void>;
  maxPhotos?: number;
  currentCount?: number;
  isLoading?: boolean;
}

export const PhotoUpload = ({
  onUpload,
  maxPhotos = 12,
  currentCount = 0,
  isLoading = false,
}: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const remainingPhotos = maxPhotos - currentCount;
  const canUpload = remainingPhotos > 0 && !isLoading;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    
    if (!file) {
      setPreview(null);
      return;
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      setPreview(null);
      return;
    }

    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      setError('Please select an image to upload');
      return;
    }

    try {
      await onUpload(fileInputRef.current.files[0]);
      // Reset after successful upload
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-[#1D3557] mb-4">Upload Photo</h2>
      
      {!canUpload ? (
        <div className="text-center p-4 bg-gray-100 rounded-lg">
          <p className="text-[#1D3557]">
            {remainingPhotos <= 0
              ? `Maximum of ${maxPhotos} photos reached`
              : 'Cannot upload photos at this time'}
          </p>
        </div>
      ) : (
        <>
          <p className="text-[#1D3557] mb-4">
            {remainingPhotos === 1
              ? 'You can upload 1 more photo'
              : `You can upload up to ${remainingPhotos} more photos`}
          </p>

          <div className="mb-4">
            <label
              htmlFor="photo-upload"
              className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2B6CB0] transition-colors"
            >
              <div className="flex flex-col items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                <span className="text-gray-600">Click to select a photo</span>
              </div>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
                disabled={isLoading}
              />
            </label>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-50 text-red-600 rounded">
              {error}
            </div>
          )}

          {preview && (
            <div className="mb-4">
              <div className="relative w-full aspect-video rounded overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleUpload}
              disabled={!preview || isLoading}
              className={`px-4 py-2 rounded ${
                !preview || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#2B6CB0] text-white hover:bg-[#1e5a9a]'
              } transition-colors flex items-center`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Upload Photo'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
