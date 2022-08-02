import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-learning-path-dashboard',
  templateUrl: './learning-path-dashboard.component.html',
  styleUrls: ['./learning-path-dashboard.component.css']
})
export class LearningPathDashboardComponent implements OnInit {
  search: any;
  id: any;
  result: any;
  result1: any;
  result2: any;
  roleid:any;
  result3:any;
  result4:any;
  userid: any;
  latestcoursedetails: any;
  lastassigned: any;
  show:any;
  loader: any;
  currentUrl:any;

  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }

  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.loader = false;
    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid')
    this.GetEmployee();
    this.GetCourse();
    this.GetTrainerCourseMapping();
    this.GetTrainerCourseMappingForProgress();
    this.GetTrainerCourseMappingForCompleted();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetEmployee();
      }
    })
  }

  public GetEmployee() {
    debugger
    this.LearningService.GetEmployee()
    
    .subscribe({
      next: data => {
        debugger
        this.result = data;
      }, error: (err) => {
        Swal.fire('Issue in GetEmployee');
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

  public GetCourse() {
    debugger
    this.LearningService.GetCourse()
    .subscribe({
      next: data => {
        debugger
        this.result1 = data;
      }, error: (err) => {
        Swal.fire('Issue in GetCourse');
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

  // public GetTrainerCourseMapping() {
  //   debugger
  //   this.LearningService.GetTrainerCourseMapping().subscribe(
  //     data => {
  //       debugger
  //       this.result2 = data;
  //     })
  // }

  public GetTrainerCourseMapping() {
    debugger
    this.LearningService.GetTrainerCourseMappingDashboard()
    .subscribe({
      next: data => {
        debugger
        this.result2 =  data.filter(x => x.staffID == this.userid && x.status == 'Manager Approved');
      }, error: (err) => {
        Swal.fire('Issue in GetTrainerCourseMappingDashboard');
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

  public GetTrainerCourseMappingForProgress() {
    debugger
    this.LearningService.GetCourse()
    .subscribe({
      next: data => {
        debugger
        this.result3 = data.filter((x: { staffID: any; completed: number; enrollid: number; notStarted:number;}) => 
        x.completed != 1 && x.enrollid != 0&&x.notStarted!=0);
        console.log("result3",this.result3)
      }, error: (err) => {
        Swal.fire('Issue in GetCourse');
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

    public GetTrainerCourseMappingForCompleted() {
      debugger
      this.LearningService.GetTestResponse()
      .subscribe({
        next: data => {
          debugger
          this.result4 = data.filter(x => x.completed == 1 && x.enrollid != 0 && x.staffID == this.userid);
        }, error: (err) => {
          Swal.fire('Issue in GetTestResponse');
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

  public GetApproveCourse() {
    debugger
    this.LearningService.GetApproveCourse(this.userid)
    
    .subscribe({
      next: data => {
        debugger
        this.result2 = data.filter(x => x.completed == 0 && x.enrollid != 0 && x.staffid==this.userid);
        console.log("result2",this.result2)
      }, error: (err) => {
        Swal.fire('Issue in GetApproveCourse');
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

  enroll(){
    Swal.fire({
      title: 'Enroll Confirmation',
      text: "Please click on OK to send Course Enrolment Request",
      icon: 'warning',
      // icon: 'success',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Request Sent',
          'Your request has been sent to manager for Approval',
          'success'
        )
      }
    })
  }

  public flip1(event: { currentTarget: any; }) {
    debugger
    var element = event.currentTarget;
    if (element.className === "card1") {
      if (element.style.transform == "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }
  };
 

 

}

