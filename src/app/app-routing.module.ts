
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { NotesComponent } from './component/notes/notes.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { BinComponent } from './component/bin/bin.component';
import { AuthGuard } from './core/services/authGuard/auth.guard';
import { CardtemplateComponent } from './component/cardtemplate/cardtemplate.component';
import { UpdatenotesComponent } from './component/updatenotes/updatenotes.component';
import { LabelComponent } from './component/label/label.component';
import { SearchcomponentComponent } from './component/searchcomponent/searchcomponent.component';
import { LabelsComponent } from './component/labels/labels.component';
import { QuestionsComponent } from './component/questions/questions.component';
import { ProductcartComponent } from './component/productcart/productcart.component';


const routes: Routes = 
[
  { path: '', redirectTo:  '/login', pathMatch:  'full' },
  { path: 'signup',component: SignupComponent },
  { path: 'login',component:  LoginComponent },
  { path: 'forgot-password',component: ForgotPasswordComponent },
  { path: 'resetpassword/:token',component: ResetPasswordComponent },
  { path: 'updatenotes',component: UpdatenotesComponent },
  { path:'label/:id',component:LabelComponent },
  { path: 'homepage',component: HomepageComponent,canActivate:[AuthGuard],children:
  [ 
    { path: '', redirectTo: 'cardtemplate', pathMatch:  'full' },
    { path:'cardtemplate',component:CardtemplateComponent },
    { path:'reminder',component:ReminderComponent },
    { path:'archive',component:ArchiveComponent }, 
    { path:'bin',component:BinComponent },
    { path:'labels/:labelName',component:LabelsComponent},
    { path:'notes',component:NotesComponent },
    { path:'searchcomponent',component:SearchcomponentComponent },
    { path:'notes/:noteid/questions',component:QuestionsComponent },
    { path:'cart' , component:ProductcartComponent}
  ] 
  },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }