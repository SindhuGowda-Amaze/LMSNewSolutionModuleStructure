import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance-new',
  templateUrl: './attendance-new.component.html',
  styleUrls: ['./attendance-new.component.css']
})
export class AttendanceNewComponent implements OnInit {
  search: any;
  id: any;
  result: any;
  count: any;
  roleid: any;
  userid: any;
  userName: any;
  Attendance: any;
  currentUrl:any;
  employeeID:any;
  trainer:any;
  noofhrs:any;
  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }

  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid');
    this.userName = sessionStorage.getItem('UserName');

    this.GetAttendance_New();
    // this.areYouReallySure = false;
    // this.allowPrompt = true;

  }
  


;
  public GetAttendance_New() {
    debugger
    this.LearningService.GetAttendance_New()
    
    .subscribe({
      next: data => {
        debugger
        if(this.roleid==4){
          this.Attendance = data.filter(x => x.trainerID == this.userid);
        }
        else{
          this.Attendance = data.filter(x => x.supervisor == this.userid);
        }
      },error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetAttendance_New');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.LearningService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
    

  }


// areYouReallySure:any;
 
// public  areYouSure() {
//     if(this.allowPrompt){
//         if (!this.areYouReallySure && true) {
//             this.areYouReallySure = true;
//             var confMessage = "***************************************\n\n W A I T !!! \n\nBefore leaving our site, follow CodexWorld for getting regular updates on Programming and Web Development.\n\n\nCLICK THE *CANCEL* BUTTON RIGHT NOW\n\n***************************************";return confMessage;
//         }
//     }else{
//         this.allowPrompt = true;
//     }
// }

// allowPrompt = true;
// window.onbeforeunload = this.areYouSure;


  // public GetEnroll(){
  //   this.LearningService.GetEnroll().subscribe(
  //     data => {
  //       debugger
  //       // this.result = data.filter(x => x.manager == this.manager );
  //       // this.result = data.filter(x => x.status == 'Manager Assigned' );
  //       this.result =  data.filter(x => x.type == 'Manager Assign')
  //       this.count = this.result.length;
  //     })
  // }






}
