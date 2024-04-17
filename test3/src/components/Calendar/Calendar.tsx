import {
  Calendar as AntCalendar,
  Badge,
  CalendarProps,
  Typography,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useUnit } from "effector-react";
import { $events, setSelectedDate } from "../../store";
import { FC } from "react";

const { Text } = Typography;

type Props = {
  onShowDrawer: () => void;
};

export const Calendar: FC<Props> = ({ onShowDrawer }) => {
  const events = useUnit($events);
  const selectDay = useUnit(setSelectedDate);

  const getEventsToDate = (value: Dayjs) => {
    return events.filter((event) => {
      return (
        dayjs(event.date).format("DD.MM.YYYY") === value.format("DD.MM.YYYY")
      );
    });
  };
  const dateCellRender = (value: Dayjs) => {
    const listData = getEventsToDate(value);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge
              status="processing"
              text={<Text ellipsis>{item.title}</Text>}
            />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <AntCalendar
      onSelect={(date, info) => {
        if (info.source === "date") {
          onShowDrawer();
          selectDay(date);
        }
      }}
      cellRender={cellRender}
    />
  );
};
