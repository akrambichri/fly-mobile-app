import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QrcodeService {
  private url = 'http://localhost:8000/api/trottinetes';

  constructor(private http: HttpClient) {}

  verifyQr(qrcode: String): Observable<string> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .post<{ data: any }>(`${this.url}/verifyQr`, { qrcode }, { headers })
      .pipe(map((response) => response.data));
  }
}
