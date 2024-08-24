import getDeadlineDistance from "../utils/getDeadlineDistance";

const Deadline = ({ timestamp }: { timestamp: string }) => {
  const { distance, passed } = getDeadlineDistance(timestamp);

  if (passed === true)
    return (
      <span className="text-error">{`deadline passed ${distance} ago`}</span>
    );

  return (
    <span className="text-green">{`deadline is on, ${distance} from now`}</span>
  );
};

export default Deadline;
