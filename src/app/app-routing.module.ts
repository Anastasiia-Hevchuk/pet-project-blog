import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'}, // редірект на головну сторінку
      {path: '', component: HomePageComponent}, // головна сторінка
      {path: 'post/:id', component: PostPageComponent} // сторінка поста
    ]
  },
  {
    path: 'admin', loadChildren: () =>import('./admin/admin.module').then(m => m.AdminModule) // роут для адмінки. loadChildren - лейзі лоад. #AdminModule - для вебпака
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
