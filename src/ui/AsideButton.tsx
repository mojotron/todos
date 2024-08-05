import { IoAddCircle } from "react-icons/io5";

type PropsType = {
  text: string;
  clickHandler: () => void;
};

const AsideButton = ({ text, clickHandler }: PropsType) => {
  return (
    <button
      className="flex items-center gap-[2px] text-blue"
      type="button"
      onClick={clickHandler}
    >
      <IoAddCircle />
      <span className="font-display relative top-[1px]">{text}</span>
    </button>
  );
};

export default AsideButton;
