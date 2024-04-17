import { Alert, Button } from "antd";
import { FC } from "react";

type ErrorAlertProps = {
  onFetch: () => void;
};

export const ErrorAlert: FC<ErrorAlertProps> = ({ onFetch }) => {
  return (
    <Alert
      type="error"
      message={
        <>
          Произошла ошибка сервера
          <Button onClick={onFetch}>Повторить запрос</Button>
        </>
      }
    />
  );
};
