import { Component, OnInit } from '@angular/core';
import { StripeService } from 'src/app/services/stripe.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Stripe } from '@ionic-native/stripe/ngx';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {
  trottinete_token: string = null;
  form = new FormGroup({
    number: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
      // Validators.maxLength(15),
    ]),
    expMonth: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(1),
    ]),
    expYear: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(1),
    ]),
    cvc: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
    ]),
  });

  constructor(
    private stripeService: StripeService,
    private stripe: Stripe,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.trottinete_token = this.route.snapshot.params.id;
    console.log(this.route.snapshot.params.id);
  }

  async addPayementMethod(loading, card_token) {
    this.stripeService
      .addPaymenTMethod({ card_token, trottinete_token: this.trottinete_token })
      .subscribe(
        async (data) => {
          console.log(data);
          const alert = await this.alertCtrl.create({
            header: 'Message',
            message: 'Trottinete open',
            buttons: ['OK'],
          });
          await alert.present();
          loading.dismiss();
          this.router.navigateByUrl('/');
        },
        async () => {
          const alert = await this.alertCtrl.create({
            message: 'Login Failed',
            buttons: ['OK'],
          });
          await alert.present();
          loading.dismiss();
        }
      );
  }

  async getPayementMethod() {
    // this.stripeService.getPayementMethodToken(this.form);
    const loading = await this.loadingCtrl.create({
      message: 'Verification ...',
    });

    await loading.present();
    this.stripe.setPublishableKey(
      'pk_test_YOUR_KEY'
    );
    await this.stripe
      .createCardToken(this.form.value)
      .then((token) => {
        console.log({ token });
        this.addPayementMethod(loading, token.id);
      })
      .catch(async (error) => {
        const alert = await this.alertCtrl.create({
          header: 'Server Error',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
        loading.dismiss();
      });
  }
}
