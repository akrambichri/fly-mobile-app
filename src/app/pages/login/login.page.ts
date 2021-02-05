import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  ngOnInit() {}

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in ...',
    });
    await loading.present();

    this.auth.login(this.form.value).subscribe(
      async (token) => {
        localStorage.setItem('access_token', token);
        loading.dismiss();
        this.auth.loadUserFromStorage();
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
}
