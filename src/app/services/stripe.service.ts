import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stripe } from '@ionic-native/stripe/ngx';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private url = 'http://localhost:8000/api/clients/billings';

  constructor(
    private stripe: Stripe,
    private alertCtrl: AlertController,
    public http: HttpClient
  ) {}

  addPaymenTMethod(payload): Observable<string> {
    const access_token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + access_token,
    }).set('Content-Type', 'application/json');
    return this.http
      .put<{ data: any }>(this.url, payload, { headers: headers })
      .pipe(map((response) => response.data));
  }

  chargeCard(trottinete_token: String): Observable<string> {
    const token = localStorage.getItem('access_token');
    const user_address = localStorage.getItem('userAddress');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .post<{ data: any }>(
        `${this.url}`,
        { trottinete_token, user_address },
        { headers }
      )
      .pipe(map((response) => response.data));
  }

  getAllInvoices(): Observable<string> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .get<{ data: any }>(`${this.url}/invoices`, { headers })
      .pipe(map((response) => response.data.invoices));
  }
}
