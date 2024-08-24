import { formatDistance } from "date-fns";

const deadlinePassed = (timestamp: string): boolean => {
  return Date.now() - new Date(timestamp).getTime() > 0;
};

const getDeadlineDistance = (
  timestamp: string
): { distance: string; passed: boolean } => {
  const distance = formatDistance(new Date(), new Date(timestamp));
  return { distance, passed: deadlinePassed(timestamp) };
};

export default getDeadlineDistance;
