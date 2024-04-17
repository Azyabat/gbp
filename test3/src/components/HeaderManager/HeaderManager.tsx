import { Button } from "antd";
import { Wrapper } from "./styled";
import { AddModal } from "../AddModal";
import { useCallback, useState } from "react";

export const HeaderManager = () => {
  const [visibleModal, setVisible] = useState(false);

  const handleClickAdd = useCallback(() => {
    setVisible(true);
  }, []);

  const handleClickClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <Wrapper>
      <Button type="primary" onClick={handleClickAdd}>
        Добавить мероприятие
      </Button>
      {visibleModal && <AddModal onClose={handleClickClose} />}
    </Wrapper>
  );
};
