import { createEvent, createStore, sample } from "effector";
import { EventDTO } from "../types/Events";
import { message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { createGate } from "effector-react";

export const $events = createStore<EventDTO[]>([], { sid: "eventsStore" });
export const addedEvent = createEvent<EventDTO>("addEvent");

export const $selectedDate = createStore<Dayjs | null>(null, {
  sid: "selectedDate",
});
export const setSelectedDate = createEvent<Dayjs>("setSelectedDate");

export const $selectedEvents = createStore<EventDTO[]>([], {
  sid: "selectedEvents",
});

export const $selectedEvent = createStore<EventDTO | null>(null, {
  sid: "selectedEvent",
});

export const removedEvent = createEvent<string>("removeEvent");

export const selectEvent = createEvent<string>("selectEvent");
export const updateEvent = createEvent<Omit<EventDTO, "id">>("updateEvent");

export const $isOpenEditModal = createStore<boolean>(false, {
  sid: "isOpenEditModal",
});
export const setVisibleEditModal = createEvent<boolean>("setVisibleEditModal");

export const DrawerGate = createGate();

sample({ clock: setVisibleEditModal, target: $isOpenEditModal });

sample({
  clock: addedEvent,
  source: $events,
  fn(source, clk) {
    message.success("Событие добавлено");
    return [...source, clk];
  },
  target: $events,
});

sample({
  clock: setSelectedDate,
  target: $selectedDate,
});

sample({
  clock: [$selectedDate, $events],
  source: { events: $events, selectedDate: $selectedDate },
  fn({ events, selectedDate }) {
    return events.filter((event) => {
      return (
        dayjs(event.date).format("DD.MM.YYYY") ===
        selectedDate?.format("DD.MM.YYYY")
      );
    });
  },
  target: $selectedEvents,
});

sample({
  clock: removedEvent,
  source: $events,
  fn(events, id) {
    message.warning("Событие удалено");
    return events.filter((event) => {
      return event.id !== id;
    });
  },
  target: $events,
});

sample({
  clock: selectEvent,
  source: $events,
  fn(events, id) {
    return (
      events.find((value) => {
        return value.id === id;
      }) || null
    );
  },
  target: $selectedEvent,
});

sample({
  clock: updateEvent,
  source: $selectedEvent,
  fn(event, newEvent) {
    return { id: event?.id || "", ...newEvent };
  },
  target: $selectedEvent,
});

sample({
  clock: $selectedEvent,
  source: $events,
  filter(src, clk) {
    return Boolean(src) && Boolean(clk);
  },
  fn(events, selectedEvent) {
    return events.map((event) => {
      if (event.id === selectedEvent?.id) {
        return { ...selectedEvent };
      }

      return { ...event };
    });
  },
  target: $events,
});

sample({
  clock: $selectedEvent,
  fn(clk) {
    return Boolean(clk);
  },
  target: $isOpenEditModal,
});

$selectedEvent.reset(DrawerGate.close);
