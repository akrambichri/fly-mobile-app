import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {
  AlertController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  constructor(
    private auth: AuthenticationService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
    ]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password_confirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Registering...',
    });
    await loading.present();
    this.auth.register(this.form.value).subscribe(
      // If success
      async (token) => {
        const toast = await this.toastCtrl.create({
          message: 'User Created',
          duration: 2000,
          color: 'dark',
        });
        localStorage.setItem('access_token', token);
        loading.dismiss();
        this.auth.loadUserFromStorage();
        this.router.navigateByUrl('/');
      },
      // If there is an error
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'There is an error',
          buttons: ['OK'],
        });
        loading.dismiss();
        await alert.present();
      }
    );
  }
}
