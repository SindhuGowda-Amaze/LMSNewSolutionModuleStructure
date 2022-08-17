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
  courseID: any;
  TopicID:any;
  noofhrs:any;
  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }

  ngOnInit(): void {
    this.Course="0"
    this.courseID="0"
    this.TopicID="0"
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid');
    this.userName = sessionStorage.getItem('UserName');
this.GetCourseDropdown();
this.getcourse();
this.getTopic();
    this.GetAttendance_New();
    // this.areYouReallySure = false;
    // this.allowPrompt = true;

  }
  



  public GetAttendance_New() {
    debugger
    this.LearningService.GetAttendance_New()
    .subscribe({
      next: data => {
        debugger
        if(this.roleid==4){
          this.Attendance = data.filter(x => x.trainerID == this.userid);
        }
        else if(this.roleid==3){
          this.Attendance = data.filter(x => x.supervisor == this.userid);
        }
        else{
          this.Attendance = data.filter(x=>x.empID==this.userid)
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


  endDate: any;
  uniquelist: any;
  Date: any;
  filterbydate() {
    this.LearningService.GetTestResponse().subscribe({
      next: (data) => {
        this.uniquelist = data.filter(
          (x) => x.startDate >= this.Date && x.endDate <= this.endDate
        );

        const key = 'coursename';
        this.uniquelist = [
          ...new Map(
            this.uniquelist.map((item: { [x: string]: any }) => [
              item[key],
              item,
            ])
          ).values(),
        ];
      },
    });
  }
  courseid: any;
  dummyuniqlist: any;
  employeereportlist:any;
  getcourseid(even: any) {
    debugger;
    this.courseid = even.target.value;
    if (even.target.value != 0) {
      this.uniquelist = this.dummyuniqlist.filter(
        (x: { coursename: any }) => x.coursename == this.courseid
      );

      this.count = this.employeereportlist.length;
    } else {
      this.GetTrainerReport();
    }
  }
  dummemployeereportlist:any;
  employeeFilterReportList:any;
  Course:any;
  public GetTrainerReport() {
    debugger;
    this.LearningService.GetTestResponse().subscribe({
      next: (data) => {
        debugger;
        this.employeereportlist = data.filter((x) => x.userID == this.userid);

        const key = 'coursename';
        this.uniquelist = [
          ...new Map(
            this.employeereportlist.map((item: { [x: string]: any }) => [
              item[key],
              item,
            ])
          ).values(),
        ];
        this.dummyuniqlist = this.uniquelist;
        this.dummemployeereportlist = data;
        this.employeeFilterReportList = this.employeereportlist;
        this.count = this.employeereportlist.length;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetTestResponse');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.LearningService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }
  courseList:any;
  public GetCourseDropdown() {
    this.LearningService.GetCourseDropdown().subscribe({
      next: (data) => {
        debugger;
        this.courseList = data;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetCourseDropdown');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.LearningService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }


  getCourseID(even: any) {
    debugger;
    this.courseID = even.target.value;
  }

  Courselist:any;
  public getcourse() {
    debugger;
    this.LearningService.GetCourseDropdown().subscribe((data) => {
      debugger;
      this.Courselist = data;
    });
  }

  TopicList:any
  public getTopic() {
    debugger;
    this.LearningService.GetChapter().subscribe((data) => {
      debugger;
      this.TopicList = data;
    });
  }

}
