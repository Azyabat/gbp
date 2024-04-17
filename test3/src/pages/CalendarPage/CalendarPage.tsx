import { useCallback, useState } from "react";
import { Calendar, EventsDrawer, HeaderManager } from "../../components";
import { useUnit } from "effector-react";
import {
  $notificationStack,
  removeEventFromStack,
} from "../../store/notification";
import dayjs from "dayjs";
import { message } from "antd";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

export const CalendarPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const stack = useUnit($notificationStack);
  const removeStackElement = useUnit(removeEventFromStack);

  const handleShowDrawer = useCallback(() => {
    setShowDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setShowDrawer(false);
  }, []);

  setInterval(
    useCallback(() => {
      const nowDate = dayjs();

      stack.forEach((stackElement) => {
        if (
          !stackElement.from
            .subtract(stackElement.notification, "minutes")
            .isSameOrBefore(nowDate, "minutes")
        ) {
          return;
        }

        message.info(
          `Напоминание, ${stackElement.title} в ${stackElement.from.format(
            "HH:mm"
          )}`
        );
        removeStackElement(stackElement.id);
      });
    }, [stack]),
    10000
  );

  return (
    <div>
      <HeaderManager />
      <Calendar onShowDrawer={handleShowDrawer} />
      {showDrawer && <EventsDrawer handleClose={handleHideDrawer} />}
    </div>
  );
};
