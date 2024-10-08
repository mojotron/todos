import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
  clickHandler?: undefined | (() => void);
};

const Button = ({
  type = "submit",
  disabled = false,
  clickHandler = undefined,
  children,
}: PropsType) => {
  return (
    <button
      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md font-medium text-white text-md uppercase font-display  rounded-lg group bg-gradient-to-br from-green to-blue group-hover:from-green group-hover:to-blue hover:text-black focus:ring-1 focus:outline-none focus:gray-600 disabled:bg-gray-500 disabled:text-gray-600"
      type={type}
      onClick={clickHandler}
      disabled={disabled}
    >
      <span className="relative px-4 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {children}
      </span>
    </button>
  );
};

export default Button;
