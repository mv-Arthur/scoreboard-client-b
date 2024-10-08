import { AxiosResponse } from "axios";
import { $api } from "./instanse";
import { Data, Schedule } from "../state/store";

export type RemarkParamType = {
     fact: string;
     remark: string;
};

export class ScoreService {
     static getTodayScore(): Promise<AxiosResponse<Data[]>> {
          return $api.get("/score");
     }

     static remarkShcedule(id: number, dto: RemarkParamType): Promise<AxiosResponse<Schedule>> {
          return $api.patch(`/score/${id}`, dto);
     }
}
