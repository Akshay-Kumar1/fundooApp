import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, ErrorHandler} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarRatingModule } from "ngx-bar-rating";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { InterceptService} from '../app/core/services/interceptor/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './core/services/httpService/http.service';
import { AuthGuard } from './core/services/authGuard/auth.guard';
import { AuthServiceService } from './core/services/authGuard/auth-service.service';
import { LoggerService } from './core/services/logger/logger.service';
import { LabelSearchPipe } from './core/pipes/label-search.pipe';
// import { ErrorsHandler } from './core/services/errorHandling/errorHandler';

import { MatInputModule ,MatCardModule, MatButtonModule,MatRadioModule,MatCheckboxModule,
         MatStepperModule,MatFormFieldModule,MatIconModule,MatSnackBarModule,MatToolbarModule,
         MatSidenavModule,MatListModule,MatMenuModule,MatExpansionModule,MatTooltipModule,
         MatDialogModule,MatChipsModule,MatDatepickerModule, MatNativeDateModule,MatTabsModule} from 
         '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';

import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { SlidePanelComponent } from './component/slide-panel/slide-panel.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NotesComponent } from './component/notes/notes.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { BinComponent } from './component/bin/bin.component';
import { RemindmeComponent } from './component/remindme/remindme.component';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { ImageComponent } from './component/image/image.component';
import { ArchivesubComponent } from './component/archivesub/archivesub.component';
import { MoreComponent } from './component/more/more.component';
import { ColorpaletteComponent } from './component/colorpalette/colorpalette.component';
import { SavenotesComponent } from './component/savenotes/savenotes.component';
import { CardtemplateComponent } from './component/cardtemplate/cardtemplate.component';
import { UpdatenotesComponent } from './component/updatenotes/updatenotes.component';
import { LabelComponent } from './component/label/label.component';
import { SearchcomponentComponent } from './component/searchcomponent/searchcomponent.component';
import { LabelsComponent } from './component/labels/labels.component';
import { DeletedialogComponent } from './component/deletedialog/deletedialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImagecropComponent } from './component/imagecrop/imagecrop.component';
import { DeletenoteComponent } from './component/deletenote/deletenote.component';
import { PinComponent } from './component/pin/pin.component';
import { CollaboratorDialogComponent } from './component/collaborator-dialog/collaborator-dialog.component';
import { QuestionsComponent } from './component/questions/questions.component'
import { ProductcartComponent } from './component/productcart/productcart.component';
import { RatingModule} from "ngx-rating";
import { CartdialogComponent } from './component/cartdialog/cartdialog.component';
import { PurchaseComponent } from './component/purchase/purchase.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    SlidePanelComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NavbarComponent,
    NotesComponent,
    ReminderComponent,
    ArchiveComponent,
    BinComponent,
    RemindmeComponent,
    CollaboratorComponent,
    ImageComponent,
    ArchivesubComponent,
    MoreComponent,
    ColorpaletteComponent,
    SavenotesComponent,
    CardtemplateComponent,
    UpdatenotesComponent,
    LabelComponent,
    LabelSearchPipe,
    SearchcomponentComponent,
    LabelsComponent,
    DeletedialogComponent,
    ImagecropComponent,
    DeletenoteComponent,
    PinComponent,
    CollaboratorDialogComponent,
    QuestionsComponent,
    ProductcartComponent,
    CartdialogComponent,
    PurchaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule ,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule,
    MatNativeDateModule, 
    MatDatepickerModule,
    ImageCropperModule,
    RatingModule,
    MatTabsModule,
    BarRatingModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[DeletedialogComponent,ImagecropComponent,DeletenoteComponent,
    CollaboratorDialogComponent,UpdatenotesComponent,CartdialogComponent], 
  providers: [InterceptService,
         {
           provide: HTTP_INTERCEPTORS,
           useClass: InterceptService,
           multi: true
         }
         ,HttpService,AuthGuard,AuthServiceService,LoggerService,MatDatepickerModule],  
  bootstrap: [AppComponent]
})
export class AppModule { }

