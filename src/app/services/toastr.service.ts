import { Injectable, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  

@Injectable({ providedIn: 'root' })
export class ToastService {
    constructor(private toastr: ToastrService) { }  
    toasts: any[] = [];

    showInfo(message: string) {
        this.toastr.info(message);
    }

    showSuccess(message: string) {
        this.toastr.success(message);
    }

    showError(message: string) {
        this.toastr.error(message);
    }

    remove(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    clear() {
        this.toasts.splice(0, this.toasts.length);
    }
}