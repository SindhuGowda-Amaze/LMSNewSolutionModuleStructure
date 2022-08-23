import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manger-dashboard',
  templateUrl: './manger-dashboard.component.html',
  styleUrls: ['./manger-dashboard.component.css'],
})
export class MangerDashboardComponent implements OnInit {
  joblist: any;
  search: any;
  count: any;
  staffid: any;
  manager: any;
  ename: any;
  currentUrl: any;
  result: any;
  employeeList: any;
  employeeid: any;
  id: any;
  show: any;
  employeedetails: any;
  dummemployeedetails: any;
  Course: any;
  constructor(public LearningService: LearningService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.Course = 0
    this.showwaiting = 0
    this.show = 2;
    this.manager = sessionStorage.getItem('userid');
    // this.GetCandidateReg()
    // this.insertdetails()
    //this.GetEnroll();
    this.GetEnroll();
    this.Showcards(2);
    this.GetCourseDropdown();
  }


  courseList: any;
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


  public GetCandidateReg() {
    debugger;
    // if (this.staffid == undefined) {
    //   this.LearningService.GetCandidateRegistration().subscribe(data => {
    //     this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0);
    //     this.count = this.joblist.length;
    //   })
    // }
    // else {
    //   this.LearningService.GetCandidateRegistration().subscribe(data => {
    //     debugger
    //     this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0 && x.staffID == this.staffid);
    //     this.count = this.joblist.length;
    //   })

    // }
  }
  uniquelist: any
  public GetEnroll() {
    debugger;
    this.LearningService.GetEnroll()
      .subscribe({
        next: (data) => {
          debugger;
          this.result = data.filter((x) => x.manager == this.manager);
          //  this.result = data
          this.dummemployeedetails = data;
          this.employeeList = data;

          debugger;
          // this.result = data.filter((x) =>x.manager == this.manager);
          this.result = data
          const key = 'chapterName';
          this.uniquelist = [...new Map(this.result.map((item: { [x: string]: any; }) =>

            [(item[key]), item])).values()]

          this.count = this.result.length;
        },
        error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting Enroll');
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
  showwaiting: any;
  getcourseid(even: any) {
    debugger;
    this.Course = even.target.value;
    if (even.target.value != 0) {
      this.result = this.result.filter(
        (x: { courseName: any }) => x.courseName == this.Course,
        this.showwaiting = 1
      );

      this.count = this.employeeList.length;
    } else {
      this.GetEnroll();
    }
  }

  getemployeeid(even: any) {
    debugger;
    this.employeeid = even.target.value;
    if (even.target.value != 0) {
      this.result = this.dummemployeedetails.filter(
        (x: { employeeName: any }) => x.employeeName == this.employeeid
      );
      this.count = this.result.length;
    } else {
      this.GetEnroll();
    }
  }

  public getid(id: any) {
    this.id = id;
  }
  // public Accept(){

  // }
  // public Reject(){}

  public Acceptcandidate() {
    debugger;
    var json = {
      ID: this.id,
      Status: 'Manager Approved',
    };

    this.LearningService.UpdateErollmentStatusApproved(json).subscribe({
      next: (data) => {
        debugger;
        let result = data;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Approved!!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.Showcards(1);
      },
      error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in UpdateErollmentStatusApproved');
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

  public Rejecttcandidate() {
    debugger;
    var json = {
      ID: this.id,
      Status: 'Manager Rejected',
    };

    this.LearningService.UpdateErollmentStatusRejected(json)
      .subscribe({
        next: (data) => {
          debugger;
          let result = data;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Rejected!!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.Showcards(3);
        },
        error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in UpdateErollmentStatusRejected');
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

  getstaffid(even: any) {
    this.staffid = even.target.value;
    if (even.target.value != 0) {
      this.result = this.dummemployeedetails.filter(
        (x: { employeeId: any }) => x.employeeId == this.staffid
      );
    } else {
      this.GetEnroll();
    }
  }

  Showcards(value: any) {
    this.show = value;
    if (value == 1) {
      this.LearningService.GetEnroll()
        .subscribe({
          next: (data) => {
            debugger;
            // this.result = data.filter(x => x.manager == this.manager );
            this.result = data.filter(
              (x) => x.status == 'Manager Approved' && x.manager == this.manager
            );
            this.count = this.result.length;
          },
          error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in GetEnroll');
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

      // this.GetCourse();
    } else if (value == 2) {
      this.LearningService.GetEnroll()
        .subscribe({
          next: (data) => {
            debugger;
            // this.result = data.filter(x => x.manager == this.manager );
            this.result = data.filter(
              (x) => x.status == 'Manager Pending' && x.manager == this.manager
            );
            this.count = this.result.length;
          },
          error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in GetEnroll');
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

      // this.GetApproveCourse();
    } else if (value == 3) {
      this.LearningService.GetEnroll()
        .subscribe({
          next: (data) => {
            debugger;
            // this.result = data.filter(x => x.manager == this.manager );
            this.result = data.filter(
              (x) => x.status == 'Manager Rejected' && x.manager == this.manager
            );
            this.count = this.result.length;
          },
          error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in GetEnroll');
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

      // this.GetApproveCourse();
    }
  }
}
