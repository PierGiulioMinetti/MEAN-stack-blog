import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum ToastTypeEnum {
  ERROR,
  SUCCESS,
  INFO,
  WARNING
}

export interface ToastDataI {
  content: string,
  toastClass: string,
  date?: Date
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toast: Subject<ToastDataI> = new Subject();

    public error(content: string,  toastClass:string = 'toast-error'): void {
        this.toast.next({content: content, toastClass});
    }
    public success(content: string): void {
        this.toast.next({content: content, toastClass: 'toast-success'});
    }
    public info(content: string): void {
        this.toast.next({content: content, toastClass: 'toast-info'});
    }
    public infoIconWarning(content: string): void {
        this.toast.next({content: content, toastClass: 'toast-info-warning'});
    }

}
