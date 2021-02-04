import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
  }

  goToPage(page) {
    this.router.navigate([page]);
  }

  logout() {
    this.auth.setLoggedIn(false)
    this.router.navigateByUrl("/login");
  }

}
