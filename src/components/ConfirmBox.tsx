import OverlayWrapper from "../ui/OverlayWrapper";

type PropsType = {
  text: string;
  confirmHandler: () => void;
  cancelHandler: () => void;
};

const ConfirmBox = ({ text, confirmHandler, cancelHandler }: PropsType) => {
  return (
    <OverlayWrapper>
      <div className="relative w-full sm:w-[400px] text-white px-4 py-6 rounded-md bg-gray-900 flex flex-col items-center justify-center gap-4">
        <h2 className="text-lg text-error">{text}</h2>
        <div className="flex w-full justify-between px-8">
          <button
            className="border border-green text-green font-bold uppercase rounded-md px-2 py-0.5 hover:text-gray-900 hover:bg-green font-monospace"
            onClick={confirmHandler}
          >
            Confirm
          </button>
          <button
            className="border border-error text-error font-bold uppercase rounded-md px-2 py-0.5 hover:text-gray-900 hover:bg-error font-monospace"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </div>
    </OverlayWrapper>
  );
};

export default ConfirmBox;
