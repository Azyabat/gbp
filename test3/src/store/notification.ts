import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { $events } from ".";
import { createEvent, createStore, sample } from "effector";
import { EventDTO } from "../types/Events";

export const $notificationStack = createStore<EventDTO[]>([], {
  sid: "notificationStack",
});

sample({
  clock: $events,
  fn(events) {
    dayjs.extend(isSameOrAfter);
    const dateNow = dayjs();
    const filteredEvents = events.filter((event) => {
      if (dayjs(event.date).isSameOrAfter(dateNow, "date")) {
        return true;
      }

      return false;
    });

    return filteredEvents.sort((eventA, eventB) => {
      const { date: dateA, from: fromA } = eventA;

      const preparedDateTimeA = `${dayjs(dateA).format("DD.MM.YYYY")} ${dayjs(
        fromA
      ).format("HH:mm")}`;

      const { date: dateB, from: fromB } = eventB;

      const preparedDateTimeB = `${dayjs(dateB).format("DD.MM.YYYY")} ${dayjs(
        fromB
      ).format("HH:mm")}`;

      return (
        dayjs(preparedDateTimeA, "DD.MM.YYYY HH:mm").diff(dateNow) -
        dayjs(preparedDateTimeB, "DD.MM.YYYY HH:mm").diff(dateNow)
      );
    });
  },
  target: $notificationStack,
});

export const removeEventFromStack = createEvent<string>("removeEventStack");

sample({
  clock: removeEventFromStack,
  source: $notificationStack,
  fn(events, id) {
    return events.filter((event) => {
      return event.id !== id;
    });
  },
  target: $notificationStack,
});
