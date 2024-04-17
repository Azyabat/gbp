import { DatePicker, Form, Input, InputNumber, Modal, TimePicker } from "antd";
import { Dayjs } from "dayjs";
import { useUnit } from "effector-react";
import { FC, useCallback } from "react";
import { $selectedEvent, addedEvent, updateEvent } from "../../store";

type AddModalProps = {
  onClose: () => void;
  isUpdate?: boolean;
};

type FormFields = {
  title: string;
  date: Dayjs;
  timeRange: Dayjs[];
  notification: number;
};

export const AddModal: FC<AddModalProps> = ({ onClose, isUpdate }) => {
  const [form] = Form.useForm<FormFields>();
  const selectedEvent = useUnit($selectedEvent);
  const addEvent = useUnit(addedEvent);
  const updateEventFn = useUnit(updateEvent);

  const initState: FormFields | undefined =
    selectedEvent && isUpdate
      ? {
          title: selectedEvent.title,
          date: selectedEvent.date,
          notification: selectedEvent.notification,
          timeRange: [selectedEvent.from, selectedEvent.to],
        }
      : ({ notification: 10 } as FormFields);

  const handleOk = useCallback(() => {
    const { date, notification, timeRange, title } = form.getFieldsValue();

    if (!isUpdate) {
      addEvent({
        id: `id-${Date.now()}`,
        date: date,
        notification: notification,
        from: timeRange[0],
        to: timeRange[1],
        title: title,
      });
    } else {
      updateEventFn({
        date: date,
        notification: notification,
        from: timeRange[0],
        to: timeRange[1],
        title: title,
      });
    }

    onClose();
  }, [addEvent, form, isUpdate, onClose, updateEventFn]);

  return (
    <Modal
      open
      okText={isUpdate ? "Обновить" : "Добавить"}
      cancelText="Отменить"
      title={isUpdate ? "Редактировать мероприятие" : "Добавить мероприятие"}
      onOk={handleOk}
      onCancel={onClose}
      zIndex={999}
    >
      <Form form={form} initialValues={initState}>
        <Form.Item label="Дата" name="date">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Название" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Продолжительность" name="timeRange">
          <TimePicker.RangePicker showSecond={false} />
        </Form.Item>
        <Form.Item label="Напоминать за" name="notification">
          <InputNumber min={1} max={60} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
