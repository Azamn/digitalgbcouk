import React from "react";

const MobileView = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* iPhone Frame */}
      <div className="relative h-[720px] w-[360px] overflow-scroll rounded-[40px] border-[14px] border-black ">
        {/* Dynamic Notch (iPhone Style) */}
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-black" />

        {/* Status Bar */}
        <div className="flex h-6 w-full items-center justify-between bg-transparent px-4 text-xs text-gray-800">
          <span>10:30</span>
          <div className="flex items-center gap-1">
            <span>📶</span>
            <span>Wi-Fi</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex h-[calc(100%-56px)] w-full flex-col overflow-y-auto pb-16">
          {children}
        </div>

        {/* Bottom Home Indicator (iPhone Style) */}
        <div className="absolute bottom-0 left-0 flex h-14 w-full items-center justify-center bg-transparent">
          <div className="h-1.5 w-24 rounded-full bg-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileView;
