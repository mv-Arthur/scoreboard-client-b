import React from "react";
import { S } from "./Row";
import TextField from "@mui/material/TextField";
import { Input } from "../input/Input";
import { observer } from "mobx-react-lite";
import { store } from "../../state/store";
import { RemarkParamType } from "../../api/ScoreService";

type PropsType = {
  id: number;
  value: string;
  limit: number;
  onSubmit: (id: number, dto: RemarkParamType) => void;
  remark: string;
  fact: string;
  type: "fact" | "remark";
};

export const EditbleRow: React.FC<PropsType> = React.memo((props) => {
  const [filled, setFilled] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);

  const mouseOverHandle = () => {
    setFilled(true);
  };
  const mouseOutHandle = () => {
    setFilled(false);
  };

  const onClickHandle = () => {
    setToggle(true);
  };

  return (
    <div>
      {!toggle ? (
        <S.EdtibleRowItem
          onClick={onClickHandle}
          $hovered={filled}
          onMouseOver={mouseOverHandle}
          onMouseOut={mouseOutHandle}
        >
          {props.value}
        </S.EdtibleRowItem>
      ) : (
        <Input
          id={props.id}
          onSubmit={props.onSubmit}
          limit={props.limit}
          setFilled={setFilled}
          initialValue={props.value}
          setToggle={setToggle}
          type={props.type}
          fact={props.fact}
          remark={props.remark}
        />
      )}
    </div>
  );
});
