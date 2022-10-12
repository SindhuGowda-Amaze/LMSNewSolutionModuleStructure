
import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  temp: any;
  userid: any;
  showenrolment: any;
  roleid: any;
  countlist: any;
  courseCount: any;
  coursedetails: any;
  assesmentlist: any;
  trainerlist: any;
  chapterlist: any;
  coursedetails1: any;
  Assigntrainerlist: any;
  countAssignTrainer: any;
  countAdminTrainercourse: any;
  currentUrl: any;

  constructor(public LearningService: LearningService) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.userid = sessionStorage.getItem('userid');
    this.roleid = sessionStorage.getItem('roleid');
    this.temp = sessionStorage.getItem('temp');
    this.GetAllCounts();
    this.GetCourse();
    if (this.userid == 10348) {
      this.showenrolment = 1;
    } else {
      this.showenrolment = 0;
    }
  }

  public flip1(event: { currentTarget: any }) {
    debugger;
    var element = event.currentTarget;
    if (element.className === 'card1') {
      if (element.style.transform == 'rotateY(180deg)') {
        element.style.transform = 'rotateY(0deg)';
      } else {
        element.style.transform = 'rotateY(180deg)';
      }
    }
  }

  public GetAllCounts() {
    debugger;
    if (this.userid != 10348) {
      this.LearningService.GetAllCounts(this.userid, 2).subscribe({
        next: (data) => {
          debugger;
          this.countlist = data[0];
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetAllCounts');
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
    } else {
      this.LearningService.GetAllCounts(10348, 1)
      .subscribe({
        next: (data) => {
          debugger;
          this.countlist = data[0];
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetAllCounts');
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
  }

  public GetCourse() {
    debugger;
    if (this.userid == 10348) {
      // this.LearningService.GetEnroll().subscribe(
      //   data => {
      //     debugger
      //     this.coursedetails = data.filter(x => x.staffID == this.userid && x.status == 'Manager Approved');
      //     console.log(" this.coursedetails", this.coursedetails.length)
      //   })

      this.LearningService.GetCourseDropdown()
      .subscribe({
        next: (data) => {
          debugger;
          this.coursedetails = data;
          console.log(' this.coursedetails', this.coursedetails.length);
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

      this.LearningService.GetTrainerCourseMappingByEnroll()
      .subscribe({
        next: (data) => {
          debugger;
          if (this.roleid == 1) {
            this.trainerlist = data;
            console.log(this.trainerlist);
          } else {
            this.trainerlist = data.filter(
              (x) => x.staffID == this.userid && x.status == 'Manager Approved'
            );
          }
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetTrainerCourseMappingByEnroll');
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

      this.LearningService.GetChapter().subscribe({
        next: (data) => {
          debugger;
          this.chapterlist = data;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetChapter');
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

      this.LearningService.GetTrainerCourseMappingDashboard()
      .subscribe({
        next: (data) => {
          debugger;

          this.Assigntrainerlist = data;
          console.log(this.Assigntrainerlist);
          this.countAdminTrainercourse = this.Assigntrainerlist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetTrainerCourseMappingDashboard');
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

      this.LearningService.GetChapterAssessment()
      .subscribe({
        next: (data) => {
          debugger;
          this.assesmentlist = data;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetChapterAssessment');
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
      this.LearningService.GetEnrollCourseChapters()
      .subscribe({
        next: (data) => {
          debugger;
          this.chapterlist = data.filter(
            (x) => x.staffID == this.userid && x.status == 'Manager Approved'
          );
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in Getting Expenses List Web');
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
    } else {
      // this.LearningService.GetCourseDropdown().subscribe(
      //   data => {
      //     debugger
      //     this.coursedetails = data;
      //   })

      this.LearningService.GetApproveCourse(this.userid)
      .subscribe({
        next: (data) => {
          debugger;
          this.coursedetails = data;
          this.courseCount = this.coursedetails.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetApproveCourse');
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

      this.LearningService.GetEnrollCourseChapters().subscribe({
        next: (data) => {
          debugger;
          this.chapterlist = data.filter(
            (x) => x.staffID == this.userid && x.status == 'Manager Approved'
          );
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetEnrollCourseChapters');
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
      this.LearningService.GetTrainerCourseMappingByEnroll().subscribe({
        next: (data) => {
          debugger;
          this.trainerlist = data;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetTrainerCourseMappingByEnroll');
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
      this.LearningService.GetEnrollCourseChaptersAssessment()
      .subscribe({
        next: (data) => {
          debugger;
          this.assesmentlist = data.filter(
            (x) => x.staffID == this.userid && x.status == 'Manager Approved'
          );
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetEnrollCourseChaptersAssessment');
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
      this.LearningService.GetTrainerCourseMappingDashboard().subscribe({
        next: (data) => {
          debugger;
          this.Assigntrainerlist = data.filter(
            (x) => x.staffID == this.userid && x.status == 'Manager Approved'
          );
          console.log(this.Assigntrainerlist);
          this.countAssignTrainer = this.Assigntrainerlist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetTrainerCourseMappingDashboard');
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

      // this.LearningService.GetEnroll().subscribe(
      //   data => {
      //     debugger
      //     this.chapterlist = data;
      //   })
    }
  }

  public GetApproveCourse() {
    debugger;
    this.LearningService.GetApproveCourse(this.userid).subscribe({
      next: (data) => {
        debugger;
        this.coursedetails = data;
        this.courseCount = this.coursedetails.length;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetApproveCourse');
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
}
