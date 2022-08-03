import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessmentdashboard',
  templateUrl: './assessmentdashboard.component.html',
  styleUrls: ['./assessmentdashboard.component.css'],
})
export class AssessmentdashboardComponent implements OnInit {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private LearningService: LearningService
  ) {}
  result: any;
  search: any;
  count: any;
  courseid: any;
  coursedetails: any;
  dummcoursedetails: any;
  question: any;
  quetionlist: any;
  p: any = 1;
  count1: any = 10;
  correctAnswers: any;
  course: any;
  question1: any;
  currentUrl: any;
  courselist: any;
  dummquetionlist: any;
  questiontype: any;
  dummquestiontype: any;
  assessmentlist: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetAssessmentResult();
    this.GetAssessments();
    this.GetCourse();
    this.GetTestResponse();
    this.GetQuestionMaster();
    this.question1 = 0;
    this.course = 0;
  }

  public GetTestResponse() {
    this.LearningService.GetTestResponse().subscribe({
      next: (data) => {
        debugger;
        // this.result = data.filter(x => x.manager == this.manager );
        this.result = data;
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
  getcourseid(even: any) {
    debugger;
    this.course = even.target.value;
    if (this.course == 0) {
      debugger;
      this.LearningService.GetAssessments().subscribe({
        next: (data) => {
          debugger;
          this.quetionlist = data;
          console.log('questionlist', this.quetionlist);
          this.dummquetionlist = data;
          this.count = this.quetionlist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetAssessments');
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
      this.LearningService.GetAssessments().subscribe({
        next: (data) => {
          debugger;
          this.quetionlist = this.dummquetionlist.filter(
            (x: { questionID: any; courseID: any }) => x.courseID == this.course
          );
          console.log('questionlist', this.quetionlist);
          this.dummquetionlist = data;

          this.count = this.quetionlist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetAssessments');
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

    // this.GetFilteredCourseID();
  }

  public GetFilteredCourseID() {
    this.LearningService.GetAssessments().subscribe({
      next: (data) => {
        debugger;
        this.quetionlist = data.filter((x) => x.courseID == this.courseid);
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetAssessments');
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

  public GetCourse() {
    debugger;
    this.LearningService.GetCourseDropdown().subscribe({
      next: (data) => {
        debugger;
        this.courselist = data;
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

  public GetQuestionMaster() {
    debugger;
    this.LearningService.GetQuestionMaster().subscribe({
      next: (data) => {
        debugger;
        this.questiontype = data;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetQuestionMaster');
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

  public GetAssessmentResult() {
    debugger;
    this.LearningService.GetAssessmentResult().subscribe({
      next: (data) => {
        debugger;
        this.assessmentlist = data;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetAssessmentResult');
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

  public GetAssessments() {
    debugger;
    this.LearningService.GetAssessments().subscribe({
      next: (data) => {
        debugger;
        this.quetionlist = data;
        console.log('questionlist', this.quetionlist);
        this.dummquetionlist = data;
        this.count = this.quetionlist.length;
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
  }

  public Ondelete(id: any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: 'Do you want to delete the Selected Record',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value == true) {
        this.LearningService.DeleteAssessments(id).subscribe({
          next: (data) => {
            debugger;
            this.GetAssessments();
          },
          error: (err: { error: { message: any } }) => {
            Swal.fire('Issue in DeleteAssessments');
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
        Swal.fire('Successfully Deleted...!');
        this.ngOnInit();
      }
    });
  }

  checkbutton() {
    location.href = '/Checkanswer';
  }

  getquestion(even: any) {
    if (even.target.value == 0) {
      this.LearningService.GetAssessments().subscribe({
        next: (data) => {
          debugger;
          this.quetionlist = this.dummquetionlist.filter(
            (x: { questionID: any; courseID: any }) => x.courseID == this.course
          );
          console.log('questionlist', this.quetionlist);
          this.dummquetionlist = data;

          this.count = this.quetionlist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetAssessments');
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
      this.LearningService.GetAssessments().subscribe({
        next: (data) => {
          debugger;
          this.quetionlist = this.dummquetionlist.filter(
            (x: { questionID: any; courseID: any }) =>
              x.questionID == this.question1 && x.courseID == this.course
          );
          console.log('questionlist', this.quetionlist);
          this.dummquetionlist = data;

          this.count = this.quetionlist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in GetAssessments');
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
}
