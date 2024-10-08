import { formatDistance } from "date-fns";

const getTimeDistance = (timestamp: string): string => {
  return `${formatDistance(new Date(timestamp), new Date(), {})} ago`;
};

export default getTimeDistance;
