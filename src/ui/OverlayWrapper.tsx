import { ReactNode } from "react";

const OverlayWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="z-40 w-[100vw] h-[100vh] fixed top-0 right-0 bottom-0 left-0 bg-gray-500 opacity-45 overflow-y-hidden"></div>
      <div className="z-50 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default OverlayWrapper;
