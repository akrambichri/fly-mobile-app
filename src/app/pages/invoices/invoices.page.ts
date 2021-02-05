import { Component, OnInit } from '@angular/core';
import { StripeService } from 'src/app/services/stripe.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {
  invoices: any = [];
  constructor(
    private stripeService: StripeService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getAllInvoices();
  }

  async getAllInvoices() {
    const loading = await this.loadingCtrl.create({
      message: 'loading ...',
    });
    await loading.present();

    this.stripeService.getAllInvoices().subscribe(
      async (data) => {
        this.invoices = data;
        loading.dismiss();
      },
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'Not found, try again',
          buttons: ['OK'],
        });
        await alert.present();
        loading.dismiss();
      }
    );
  }

  convertTimeStamp(item) {
    return new Date(item * 1000).toLocaleString();
  }
}
