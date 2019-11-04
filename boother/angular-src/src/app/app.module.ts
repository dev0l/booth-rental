// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { BoothDetailComponent } from './components/booth-detail/booth-detail.component';
import { BootherComponent } from './components/boother/boother.component';
import { FooterComponent } from './components/footer/footer.component';

// Services
import { AuthService } from './services/auth.service';
import { BootherService } from './services/boother.service';
import { ValidateService } from './services/validate.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-detail', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'user-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'booth-detail', component: BoothDetailComponent, canActivate: [AuthGuard] },
  { path: 'booth-detail/:id', component: BoothDetailComponent, canActivate: [AuthGuard] },
  { path: 'boother', component: BootherComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    UserDetailComponent,
    BoothDetailComponent,
    BootherComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes)
  ],

  providers: [AuthService, BootherService, ValidateService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
