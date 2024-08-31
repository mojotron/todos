import getDeadlineDistance from "../utils/getDeadlineDistance";
import isToday from "../utils/isToday";

const Deadline = ({ timestamp }: { timestamp: string }) => {
  if (isToday(new Date(timestamp)))
    return <span className="text-error">{`DEADLINE IS TODAY`}</span>;

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
