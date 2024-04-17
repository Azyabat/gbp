import { Drawer, Space } from "antd";
import { useGate, useUnit } from "effector-react";
import {
  $isOpenEditModal,
  $selectedDate,
  $selectedEvents,
  DrawerGate,
} from "../../store";
import { FC } from "react";
import { EditModal, EventCard } from "..";

type Props = {
  handleClose: () => void;
};

export const EventsDrawer: FC<Props> = ({ handleClose }) => {
  const showModal = useUnit($isOpenEditModal);
  const selectedDate = useUnit($selectedDate);
  const events = useUnit($selectedEvents);

  useGate(DrawerGate);

  return (
    <Drawer
      zIndex={100}
      open
      onClose={handleClose}
      title={`Мероприятия ${selectedDate?.format("DD.MM.YYYY")}`}
    >
      <Space direction="vertical" size={8}>
        {events.map((event) => (
          <EventCard {...event} key={event.id} />
        ))}
      </Space>
      {showModal && <EditModal />}
    </Drawer>
  );
};
