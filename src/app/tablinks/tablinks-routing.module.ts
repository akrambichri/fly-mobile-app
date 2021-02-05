import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [
  {
    path: 'tablinks',
    component: TablinksPage,
    children: [
      {
        path: 'maps',
        loadChildren: () =>
          import('../maps/maps.module').then((m) => m.MapsPageModule),
      },
      {
        path: 'qr-scanner',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../qr-scanner/qr-scanner.module').then(
                (m) => m.QrScannerPageModule
              ),
          },
          {
            path: 'stripe/:id',
            loadChildren: () =>
              import('../pages/stripe/stripe.module').then(
                (m) => m.StripePageModule
              ),
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../settings/settings.module').then(
                (m) => m.SettingsPageModule
              ),
          },
          {
            path: 'profile',
            loadChildren: () =>
              import('../pages/profile/profile.module').then(
                (m) => m.ProfilePageModule
              ),
          },
          {
            path: 'invoices',
            loadChildren: () =>
              import('../pages/invoices/invoices.module').then(
                (m) => m.InvoicesPageModule
              ),
          },
          {
            path: 'plans',
            loadChildren: () =>
              import('../pages/plans/plans.module').then(
                (m) => m.PlansPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tablinks/maps',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tablinks/maps',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule {}
