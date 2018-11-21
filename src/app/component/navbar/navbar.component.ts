import { Component,Output, EventEmitter,OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver,Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../core/services/httpService/http.service'
import { Router, Params, ActivatedRoute } from '@angular/router'
import { LabelComponent } from '../label/label.component';
import { MatDialog } from '@angular/material'
import { DataserviceService } from '../../core/services/dataservice/dataservice.service';
import { environment } from 'src/environments/environment';
import { ImagecropComponent } from 'src/app/component/imagecrop/imagecrop.component'; 
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteserviceService } from 'src/app/core/services/noteService/noteservice.service';
import { UserserviceService } from '../../core/services/userService/userservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']  
})

export class NavbarComponent implements OnInit,OnDestroy
{
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() labelsEmit = new EventEmitter();
  access_token = localStorage.getItem('token');
  id = localStorage.getItem('userId');
  private labelName:any;
  private labelList:any=[];
  private labelArray: any = [];
  private gridObj=0;
  private globalSearch:any;
  private params:any;
  private ProfilePath: any;
  public name='FUNDOO'
  constructor(private dataService:DataserviceService,public dialog: MatDialog, private notesService:NoteserviceService
    ,private breakpointObserver: BreakpointObserver,private myHttpService: HttpService, 
    private router: Router,public data:DataserviceService,private route:ActivatedRoute,private userService:UserserviceService) { }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  /**
 * @description : Logout API
 */
removeToken() {
  this.userService.logout().subscribe(data => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('firstName')
        localStorage.removeItem('lastName')
        localStorage.removeItem('userId')
        this.router.navigateByUrl('/login')
      })
    error => {
      LoggerService.error('error',error);
    }
  }
  email: any;
  firstName: any;
  lastName: any;

  ngOnInit() 
  {
    this.getLabels();
    this.email = localStorage.getItem('email')
    this.lastName = localStorage.getItem('lastName')
    this.firstName = localStorage.getItem('firstName')
    this.name = localStorage.getItem('name');
  }
  titles(name)
  {
    this.name=name;
    localStorage.setItem('name',name);
  }
/**
 * @description : Opening Dialog for labels
 */
  openDialog() 
  {
    const dialogRef = this.dialog.open(LabelComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
       this.getLabels()
    });
  }
  keySearch(){
    this.data.changeMessage(this.globalSearch);

  }

/**
 * @description : Navigate to Search Component
 */
  navigate(){
    this.router.navigate(['homepage/searchcomponent']);
  }
  /**
 * @description : Get labels API
 */
  getLabels() 
  {
    let array=[];
    this.notesService.labelsPrint()
    .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        for (let i = 0; i < data['data']['details'].length; i++) 
        {
          if (data['data']['details'][i].isDeleted == false) 
          {
            array.push(data['data']['details'][i]);
          }
        }
        array.sort(function(a, b)
        {
          var A=a.label.toLowerCase(),B=b.label.toLowerCase()
          if(A < B) return -1;
          if(A > B ) return 1; 
           return 0;
        })
        this.labelArray=array;
        this.labelsEmit.emit({
        })
      })
    error => {
      LoggerService.error('error',error);
    }
  }
  /**
 * @description : Routing to labelByName
 */
  labelByName(labels)
  {
    this.labelName=labels.label
    this.router.navigate(['homepage/labels/'+this.labelName])
  }
  viewToggle()
  {
    this.dataService.observeView(true);
    this.gridObj = 1;
  }
  view()
  {
    this.dataService.observeView(false);
    this.gridObj = 0;
  }
selectedFile = null;
public image2 = localStorage.getItem('imageUrl');
img = environment.profilePicUrl + this.image2;

/**
 * @description : upload profile pic file event
 */

onFileUpload(event) {
this.profileCropOpen(event);
this.selectedFile = event.path[0].files[0];
const uploadData = new FormData();
uploadData.append('file', this.selectedFile, this.selectedFile.name); 
}
image = {};
public pic;

/**
 * @description : Dialog popup for image cropping
 */
profileCropOpen(data): void {
const dialogRefPic = this.dialog.open(ImagecropComponent, { 
width: '450px',
data: data
});

dialogRefPic.afterClosed().subscribe(result => {
this.data.currentMsg .pipe(takeUntil(this.destroy$)).subscribe(message => this.pic = message)
if (this.pic == true) {
this.image2 = localStorage.getItem('imageUrl');
this.img = environment.profilePicUrl + this.image2;
}

});
}
ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}

}
