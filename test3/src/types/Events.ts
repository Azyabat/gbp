import { Dayjs } from "dayjs";

export type EventDTO = {
  id: string;
  date: Dayjs;
  from: Dayjs;
  to: Dayjs;
  notification: number;
  title: string;
};
