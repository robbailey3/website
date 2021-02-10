export class Notification {
  constructor(
    public content: string,
    public type: 'success' | 'error' | 'warning' | 'info',
    public autoDismiss: boolean = true,
    public autoDismissTimeout: number = 10000,
    public isActive: boolean = true
  ) {
    if (this.autoDismissTimeout) {
      setTimeout(() => {
        this.isActive = false;
      }, this.autoDismissTimeout);
    }
  }

  public show() {
    this.isActive = true;
  }

  public hide() {
    this.isActive = false;
  }
}
