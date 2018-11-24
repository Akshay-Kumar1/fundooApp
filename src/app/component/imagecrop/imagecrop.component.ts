import { Component, OnInit, Inject , OnDestroy} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpService } from '../../core/services/httpService/http.service';
import { DataserviceService } from '../../core/services/dataservice/dataservice.service';
import { environment } from '../../../environments/environment'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-imagecrop',
  templateUrl: './imagecrop.component.html',
  styleUrls: ['./imagecrop.component.scss']
})
export class ImagecropComponent implements OnInit , OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  private croppedImage: any = '';
  private imageChangedEvent: any = '';
  constructor(
  public dialogRefPic: MatDialogRef<NavbarComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private myHttpService: HttpService,
  private dataService: DataserviceService) { }
  
  ngOnInit() 
  {
  }
  imageCropped(event: any) {
  this.croppedImage =event.file;
  }
  public image2 = localStorage.getItem('imageUrl');
  img = environment.profilePicUrl + this.image2;

  /**
 * @description : Upload image API
 */
  upload() {
  var token = localStorage.getItem('token');

  const uploadData = new FormData();
  uploadData.append('file', this.croppedImage);
  this.myHttpService.httpAddImage('/user/uploadProfileImage', uploadData, token)
  .pipe(takeUntil(this.destroy$))
  .subscribe(res => {
  this.img = environment.profilePicUrl + res['status'].imageUrl;
  localStorage.setItem("imageUrl", res['status'].imageUrl);
  this.dialogRefPic.close()
  this.dataService.changeMsg(true);
  }) 
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  }


