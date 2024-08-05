import { IoCloseCircle } from "react-icons/io5";

type PropsType = {
  handleClick: () => void;
};

const CloseButton = ({ handleClick }: PropsType) => {
  return (
    <button
      title="close form"
      className="absolute top-2 right-4 rounded-full size-4 flex items-center justify-center text-error hover:text-green"
      onClick={handleClick}
    >
      <IoCloseCircle className="size-full" />
    </button>
  );
};

export default CloseButton;
