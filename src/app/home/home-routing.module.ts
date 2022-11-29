import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children : [
      {
        path: 'galerie',
    loadChildren: () => import('src/app/pages/gallery/gallery.module').then( m => m.GalleryPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../pages/contact/contact.module').then( m => m.ContactPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
