import { RemarkParamType, ScoreService } from "../api/ScoreService";
import { makeAutoObservable } from "mobx";
import { AlertProps } from "@mui/material/Alert";
import { isAxiosError } from "axios";
import { SocketAPI } from "../api/socketAPI";
export type Data = {
     id: number;
     type: string;
     date: string;
     airPortName: string;
     schedule: Schedule[];
};

export type Schedule = {
     id: number;
     carrier: string;
     time: string;
     flightName: string;
     flightNumber: string;
     fact: string;
     reamark: string;
};

class Store {
     data = [] as Data[];
     date: Date = new Date();
     isLoading: boolean = false;
     snackbar: Pick<AlertProps, "children" | "severity"> | null = null;
     isConnected: boolean = false;
     constructor() {
          makeAutoObservable(this, {}, { deep: true });
     }

     setConnetction(value: boolean) {
          this.isConnected = value;
     }

     setDate() {
          this.date = new Date();
     }

     setIsLoading(value: boolean) {
          this.isLoading = value;
     }

     setSnackBar(data: Pick<AlertProps, "children" | "severity"> | null) {
          this.snackbar = data;
     }

     setData(data: Data[]) {
          this.data = data;
     }

     editSchedule(id: number, dto: RemarkParamType) {
          this.data = this.data.map((el) => ({
               ...el,
               schedule: el.schedule.map((el) => (el.id === id ? { ...el, reamark: dto.remark, fact: dto.fact } : el)),
          }));
     }

     async fetchData() {
          try {
               this.setIsLoading(true);
               const response = await ScoreService.getTodayScore();
               this.setData(response.data);
               this.setIsLoading(false);
          } catch (err) {
               if (isAxiosError(err)) {
                    this.setSnackBar({
                         children: err.response?.data.message,
                         severity: "error",
                    });
                    this.setIsLoading(false);
               }
          }
     }

     async fetchToEdit(id: number, dto: RemarkParamType) {
          try {
               this.setIsLoading(true);
               const response = await ScoreService.remarkShcedule(id, dto);
               SocketAPI.remarkSchedule(id, dto);
               this.editSchedule(response.data.id, {
                    remark: response.data.reamark,
                    fact: response.data.fact,
               });
               this.setIsLoading(false);
               this.setSnackBar({ children: "Успех", severity: "success" });
          } catch (err) {
               if (isAxiosError(err)) {
                    this.setSnackBar({
                         children: err.response?.data.message,
                         severity: "error",
                    });
               }
          }
     }
}

export const store = new Store();
