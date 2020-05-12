import { LearningGuardService } from './services/learning-guard.service';
import { DataGeneratorService } from './services/data-generator.service';
import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatCardModule} from '@angular/material/card'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './header/login/login.component';
import { UserComponent } from './header/user/user.component';
import { LearningComponent } from './learning/learning.component';
import { SamePasswordsDirective } from './directives/same-passwords.directive';
import { UniqueUsernameDirective } from './directives/unique-username.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    LearningComponent,
    SamePasswordsDirective,
    UniqueUsernameDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatSidenavModule,
    MatDividerModule,
    MatTabsModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    DataGeneratorService,
    LearningGuardService,
    UniqueUsernameDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
