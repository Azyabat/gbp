import { FC, useCallback } from "react";
import { EventDTO } from "../../types/Events";
import { EventCardWrapper, Title } from "./styled";
import { Button, Space, Typography } from "antd";
import { useUnit } from "effector-react";
import { removedEvent, selectEvent } from "../../store";

const { Text } = Typography;

export const EventCard: FC<EventDTO> = ({
  title,
  from,
  to,
  notification,
  id,
}) => {
  const selectEventFn = useUnit(selectEvent);
  const removeEvent = useUnit(removedEvent);
  const preparedFrom = from.format("HH:mm");
  const preparedTo = to.format("HH:mm");

  const handleRemove = useCallback(() => {
    removeEvent(id);
  }, [id, removeEvent]);

  return (
    <EventCardWrapper>
      <Title>
        <Text ellipsis>{title} </Text>
        <Space size={0}>
          <Button
            onClick={() => {
              selectEventFn(id);
            }}
            type="text"
          >
            Edit
          </Button>
          <Button onClick={handleRemove} type="text">
            X
          </Button>
        </Space>
      </Title>
      <div>
        <span>{preparedFrom}</span> - <span>{preparedTo}</span>
      </div>
      <div>
        <span>Напоминать за {notification} минут/ы</span>
      </div>
    </EventCardWrapper>
  );
};
