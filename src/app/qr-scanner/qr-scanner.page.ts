import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { QrcodeService } from 'src/app/services/qrcode.service';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
  data: any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private qrService: QrcodeService,
    private stripeService: StripeService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  start() {
    this.verifyQr('c36f4f58-3296-4ef7-aea9-827d912c70e7', 'start');
    // this.data = null;
    // this.barcodeScanner
    //   .scan()
    //   .then((barcodeData) => {
    //     console.log('Barcode data', barcodeData);
    //     this.data = barcodeData;
    //     this.verifyQr(barcodeData.text);
    //   })
    //   .catch((err) => {
    //     console.log('Error', err);
    //   });
  }

  return() {
    this.verifyQr('c36f4f58-3296-4ef7-aea9-827d912c70e7', 'return');
    // this.data = null;
    // this.barcodeScanner
    //   .scan()
    //   .then((barcodeData) => {
    //     console.log('Barcode data', barcodeData);
    //     this.data = barcodeData;
    //     this.verifyQr(barcodeData.text);
    //   })
    //   .catch((err) => {
    //     console.log('Error', err);
    //   });
  }

  async verifyQr(code, type) {
    const loading = await this.loadingCtrl.create({
      message: 'verification ...',
    });
    await loading.present();

    this.qrService.verifyQr(code).subscribe(
      async () => {
        if (type === 'start') {
          this.router.navigateByUrl(`/tablinks/qr-scanner/stripe/${code}`);
          loading.dismiss();
        } else if (type === 'return') this.chargeCard(code, loading);
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

  chargeCard(trottinete_token, loading) {
    this.stripeService.chargeCard(trottinete_token).subscribe(
      async () => {
        loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Message',
          message: 'Trottinete close',
          buttons: ['OK'],
        });
        await alert.present();
        loading.dismiss();
        this.router.navigateByUrl('/');
      },
      async (error) => {
        console.log(error);

        const alert = await this.alertCtrl.create({
          message: error.error.message,
          buttons: ['OK'],
        });
        await alert.present();
        loading.dismiss();
      }
    );
  }
}
