import {Component, Input} from '@angular/core';
import {AlertService} from './alert.service';
import {Alert, AlertType} from './alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {

  alerts: Alert[] = [];
  @Input() timeout = 3000;

  constructor(
    private alertService: AlertService
  ) {
    this.alertService
      .getAlert()
      .subscribe( alert => {
        if (!alert) {
          this.alerts = [];
          return;
        }

        this.alerts.push(alert);
        setTimeout(() => this.removeAlert(alert), this.timeout);
      });
  }

  getAlertCass(alert: Alert) {
    if (!alert) {
      return '';
    }

    switch (alert.type) {
      case AlertType.DANGER:
        return 'alert alert-danger';
      case AlertType.SUCCESS:
        return 'alert alert-success';
      case AlertType.WARNING:
        return 'alert alert-warning';
      case AlertType.INFO:
        return 'alert alert-info';
    }
  }
  private removeAlert(alertToRemove: Alert) {
    this.alerts = this.alerts.filter( alert => alert !== alertToRemove);
  }
}
