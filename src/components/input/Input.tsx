import React from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { red } from "@mui/material/colors";

type PropsType = {
     initialValue: string;
     setToggle: React.Dispatch<React.SetStateAction<boolean>>;
     setFilled: React.Dispatch<React.SetStateAction<boolean>>;
     limit: number;
     onSubmit: (id: number, RemarkParamType: any) => void;
     id: number;
     type: "fact" | "remark";
     fact: string;
     remark: string;
};

export const Input: React.FC<PropsType> = React.memo((props) => {
     const [value, setValue] = React.useState(props.initialValue);
     const inputRef = React.useRef<null | HTMLInputElement>(null);
     const [error, setError] = React.useState(false);
     React.useEffect(() => {
          inputRef.current?.focus();
     }, []);

     const onKeyDownHandle = (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.code === "Enter" && !error) {
               props.setToggle(false);
               props.setFilled(false);

               const dto =
                    props.type === "fact" ? { remark: props.remark, fact: value } : { remark: value, fact: props.fact };

               props.onSubmit(props.id, dto);
          }

          if (e.code === "Escape") {
               props.setToggle(false);
               props.setFilled(false);
          }
     };

     const onChangeHandle = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.currentTarget.value.length > props.limit) {
               setError(true);
          } else {
               setError(false);
          }

          setValue(e.currentTarget.value);
     }, []);

     return (
          <S.Container>
               <S.Label $error={error}>
                    количество символов {value.length} / {props.limit}
               </S.Label>
               <S.Input
                    $error={error}
                    ref={inputRef}
                    value={value}
                    onChange={onChangeHandle}
                    onKeyDown={onKeyDownHandle}
               />
          </S.Container>
     );
});

const S = {
     Container: styled.div`
          position: relative;
     `,
     Label: styled.div<{ $error: boolean }>`
          position: absolute;
          font-size: 15px;
          background-color: #fff;
          top: 0;
          left: 0;
          transform: translate(15px, -10px);
          padding: 0 5px;
          color: ${(props) => (props.$error ? "rgb(243, 70, 70)" : "rgb(25, 118, 210)")};
     `,
     Input: styled.input<{ $error: boolean }>`
          font-size: 20px;
          border-radius: 10px;
          outline-color: ${(props) => (props.$error ? "rgb(243, 70, 70)" : "rgb(25, 118, 210)")};
          border: 1px solid #909090;
          padding: 10px;
     `,
};
