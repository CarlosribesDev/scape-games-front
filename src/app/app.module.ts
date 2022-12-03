import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRotingModule } from './app-roting.module';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from './modals/modals.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserRegistrationComponent,
    MainPageComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AppRotingModule,
    ReactiveFormsModule,
    ModalsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
