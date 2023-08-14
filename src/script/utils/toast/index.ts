import { MAX_TOAST, TOAST_DURATION, VERTICAL_OFFSET } from '../../constants';
import { IMessage } from '../../interfaces';
import { TYPE_MESSAGES } from '../../types';
import { querySelector } from '../doms';

export class Toast {
  private currentToastCount: number = 0;
  private maxToastCount: number = MAX_TOAST;
  private verticalOffset: number = VERTICAL_OFFSET;

  private createToast(type: string, title: string, message: string) {
    const mainElement: HTMLDivElement = querySelector('.main-content');
    const toast = document.createElement('div');

    toast.classList.add('toast', `toast-${type}`, 'open');

    // If current toast > max toast
    if (this.currentToastCount >= this.maxToastCount) {
      return;
    }

    this.currentToastCount++; // Increase the number of toasts showing

    toast.innerHTML = `<div class="toast-body">
                          <h3 class="toast-title">${title}</h3>
                          <p class="toast-message">${message}</p>
                       </div>
                       <button class="toast-close">&times;</button>`;

    // Use requestAnimationFrame to make sure the toast has been added to the DOM
    requestAnimationFrame(() => {
      const topPosition = this.currentToastCount * (toast.offsetHeight + this.verticalOffset);

      toast.style.top = `${topPosition}px`;
    });

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      toast.remove();
      this.currentToastCount--;
    }, TOAST_DURATION);

    // Remove toast when clicked
    toast.onclick = (event: Event) => {
      const target = event.target as Element;

      if (target.closest('.toast-close')) {
        toast.remove();
        this.currentToastCount--;
      }
    };

    // Add toastElement to mainElement
    mainElement.appendChild(toast);
  }

  success({ message, title = TYPE_MESSAGES.SUCCESS }: IMessage) {
    this.createToast(TYPE_MESSAGES.SUCCESS, title, message);
  }

  error({ message, title = TYPE_MESSAGES.ERROR }: IMessage) {
    this.createToast(TYPE_MESSAGES.ERROR, title, message);
  }
}
