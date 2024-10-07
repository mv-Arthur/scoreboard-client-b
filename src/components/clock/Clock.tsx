import { store } from "../../state/store";
import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";

const format = (value: number) => {
  const str = value.toString();

  if (str.length === 1) return `0${str}`;

  return str;
};

export const Clock: React.FC = React.memo(
  observer(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      const interval = setInterval(() => store.setDate(), 1000);

      return () => clearInterval(interval);
    }, []);

    const hours = format(store.date.getHours());
    const minuts = format(store.date.getMinutes());
    const seconds = format(store.date.getSeconds());

    return (
      <S.Clock>
        {hours}:{minuts}:{seconds}
      </S.Clock>
    );
  })
);

const S = {
  Clock: styled.div`
    font-size: 70px;
    font-weight: 900;
  `,
};
