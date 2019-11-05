import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'check-otp',
    loadChildren: './pages/check-otp/check-otp.module#CheckOtpPageModule'
  },
  {
    path: 'forgot-password',
    loadChildren:
      './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule'
  },
  {
    path: 'change-password',
    loadChildren:
      './pages/change-password/change-password.module#ChangePasswordPageModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/Profile/profile.module#ProfilePageModule',
  },
  {
    path: 'contact',
    loadChildren: './pages/contact/contact.module#ContactPageModule',
  },
  {
    path: 'my-calendar',
    loadChildren: './pages/my-calendar/my-calendar.module#MyCalendarPageModule',
  },
  {
    path: 'history',
    loadChildren: './pages/history/history.module#HistoryPageModule',
  },
  {
    path: 'donors',
    loadChildren: './pages/donors/donors.module#DonorsPageModule',
  },
  {
    path: 'filters',
    loadChildren: './pages/filters/filters.module#FiltersPageModule',
  },
  {
    path: 'feedback',
    loadChildren: './pages/feedback/feedback.module#FeedbackPageModule'
  },
  {
    path: 'news',
    loadChildren: './pages/news/news.module#NewsPageModule'
  },
  {
    path: 'contact-profile',
    loadChildren: './pages/contact-profile/contact-profile.module#ContactProfilePageModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
