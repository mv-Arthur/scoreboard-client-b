import React from "react";
import uvtIcon from "../../icons/uvt-aero.svg";
import styled from "styled-components";
import { Schedule, store } from "../../state/store";
import TextField from "@mui/material/TextField";
import { EditbleRow } from "./EditbleRow";
import { observer } from "mobx-react-lite";
import { RemarkParamType } from "../../api/ScoreService";

export const Row: React.FC<Schedule> = React.memo(
  observer((props) => {
    const onSubmit = (id: number, dto: RemarkParamType) => {
      if (!dto.remark) {
        store.fetchToEdit(id, {
          ...dto,
          fact: dto.fact,
        });
      } else {
        store.fetchToEdit(id, {
          ...dto,
          remark: dto.remark,
        });
      }
    };

    return (
      <>
        <S.RowItem>{props.time}</S.RowItem>
        <S.RowItem>{props.flightName}</S.RowItem>
        <S.RowItem>
          <S.Flight>
            <S.Img src={uvtIcon} />
            <S.FlightContainer>
              <S.FlightNumber>{props.flightNumber}</S.FlightNumber>
              <S.Company>{props.carrier}</S.Company>
            </S.FlightContainer>
          </S.Flight>
        </S.RowItem>
        <EditbleRow
          remark={props.reamark}
          fact={props.fact}
          id={props.id}
          onSubmit={onSubmit}
          limit={5}
          value={props.fact}
          type={"fact"}
        />
        <EditbleRow
          remark={props.reamark}
          fact={props.fact}
          id={props.id}
          onSubmit={onSubmit}
          limit={40}
          value={props.reamark}
          type={"remark"}
        />
      </>
    );
  })
);

export class S {
  static Container = styled.div``;
  static FlightContainer = styled.div``;
  static Company = styled.div`
    color: rgb(153, 153, 153);
  `;
  static FlightNumber = styled.div`
    color: rgb(0, 68, 187);
  `;
  static Flight = styled.div`
    display: flex;
    gap: 10px;
  `;
  static RowItem = styled.div`
    width: 300px;
    overflow-wrap: break-word;
    font-size: 50px;
    text-align: start;
  `;

  static EdtibleRowItem = styled(this.RowItem)<{ $hovered?: boolean }>`
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    font-size: 35px;

    background: ${(props) => props.$hovered && "rgb(212, 212, 212)"};
  `;

  static imgContainer = styled.div`
    border-radius: 20px;
  `;

  static Img = styled.img``;
}
