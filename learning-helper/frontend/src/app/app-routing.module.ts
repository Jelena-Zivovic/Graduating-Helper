import { UserInfoComponent } from './user-info/user-info.component';
import { NewSubjectComponent } from './learning/new-subject/new-subject.component';
import { OrganizeDayComponent } from './learning/organize-day/organize-day.component';
import { RegisterGuardService } from './services/register-guard.service';
import { LearningGuardService } from './services/learning-guard.service';
import { LearningComponent } from './learning/learning.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent, canActivate: [RegisterGuardService]},
  {path: 'learning', component: LearningComponent, canActivate: [LearningGuardService]},
  {path: 'organizer', component: OrganizeDayComponent, canActivate: [LearningGuardService]},
  {path: 'preparing', component: NewSubjectComponent, canActivate: [LearningGuardService]},
  {path: 'account', component: UserInfoComponent, canActivate: [LearningGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
