import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastDataI, ToastService } from 'src/app/core/services/toast.service';



@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  protected toasts: ToastDataI[] = [];

  constructor(private toastService: ToastService) {
      this.toastService.toast.subscribe((toast: ToastDataI) => {
          this.toasts.push({ ...toast, date: new Date() });
      });
  }

  protected removeToast(toast: { text: string, toastClass: string, date: Date }): void {
      this.toasts = this.toasts.filter((item: ToastDataI) => item.date !== toast.date);
  }
}
