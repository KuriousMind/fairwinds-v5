export const LoadingState = ({ text = 'Loading...' }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-[#2B6CB0] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-[#1D3557] font-medium">{text}</p>
    </div>
  );
};
