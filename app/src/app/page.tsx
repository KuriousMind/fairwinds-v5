"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingState } from "@/components/common/ui/LoadingState";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5E6D3]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#1D3557] mb-4">Fairwinds RV App</h1>
        <p className="text-[#1D3557] mb-8">Manage your RV maintenance and records</p>
        <div className="w-16 h-16 mx-auto mb-8">
          <LoadingState text="Loading..." />
        </div>
        <p className="text-sm text-[#1D3557]">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
