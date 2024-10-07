import React from "react";
import styled from "styled-components";
import { Row } from "../row/Row";
import { Data } from "../../state/store";
import { Clock } from "../clock/Clock";
import WifiIcon from "@mui/icons-material/Wifi";
type PropsType = {
  data: Data;
  switch: React.Dispatch<React.SetStateAction<number>>;
  isConnected: boolean;
  clock?: boolean;
};

type MapType = {
  [key: string]: string;
};

const map: MapType = {
  departure: "Вылет",
  arrival: "Прилет",
};

const format = (value: string) => {
  const splitted = value.split("-");

  return `${splitted[2]}-${splitted[1]}-${splitted[0]}`;
};

export const Table: React.FC<PropsType> = React.memo((props) => {
  const clickHandle = () => {
    props.switch((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <S.Container>
      <S.HeaderContainer>
        <div
          onClick={clickHandle}
          style={{
            display: "flex",
            gap: "10px",
            userSelect: "none",
          }}
        >
          <S.Date>{map[props.data.type]}</S.Date>
          <S.Date>{format(props.data.date)}</S.Date>
        </div>
        {props.clock && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Clock />
            <WifiIcon color={props.isConnected ? "success" : "error"} />
          </div>
        )}
      </S.HeaderContainer>
      <S.Table>
        <S.HeaderItem>Время</S.HeaderItem>
        <S.HeaderItem>Направление</S.HeaderItem>
        <S.HeaderItem>Рейс</S.HeaderItem>
        <S.HeaderItem>Факт</S.HeaderItem>
        <S.HeaderItem>Примечание</S.HeaderItem>
        {props.data.schedule.map((el) => {
          return <Row key={el.id} {...el}></Row>;
        })}
      </S.Table>
    </S.Container>
  );
});

export const S = {
  HeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  `,
  Container: styled.div`
    padding: 30px;
    width: 100vw;
    height: 50vh;
    border-left: 1px solid rgb(153, 153, 153);
  `,

  Date: styled.div`
    font-size: 70px;
    font-weight: 700;
  `,
  Table: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 50px;
  `,
  Header: styled.div``,
  HeaderItem: styled.div`
    border-bottom: 1px solid rgb(153, 153, 153);
    padding-bottom: 15px;
    font-weight: 400;
    font-size: 40px;
    color: rgb(153, 153, 153);
  `,
  Row: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;
  `,
};
