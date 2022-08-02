import { Component, ElementRef, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessment-result',
  templateUrl: './assessment-result.component.html',
  styleUrls: ['./assessment-result.component.css'],
})
export class AssessmentResultComponent implements OnInit {
  constructor(
    private AmazeService: LearningService,
    private ActivatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    public router: Router
  ) {}

  TestResult: any;
  id: any;
  Totalmarks: any;
  CourseName: any;
  Chaptername: any;
  staffanme: any;
  ObtainedMarks: any;
  correctAnswers: any;
  wronganswers: any;
  date: any;
  detailslist: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.getdetailslist();
    this.GetMyDetails();
    this.GetChapter();
    this.GetCourse();

    debugger;
    this.ActivatedRoute.params.subscribe({
      next: (data) => {
        debugger;
        this.id = (params: any) => ['id'];
        this.AmazeService.GetTestResponse().subscribe((data) => {
          debugger;
          let temp: any = data.filter((x) => x.id == this.id);
          this.Totalmarks = temp[0].totalmarks;
          this.date = temp[0].modifiedDate;
          this.TestResult = temp[0].testResult;
          this.ObtainedMarks = temp[0].obtainedMarks;
          this.correctAnswers = temp[0].correctAnswers;
          this.wronganswers = temp[0].wronganswers;
        });
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetTestResponse');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.AmazeService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }

  public GetCourse() {
    this.AmazeService.GetCourse().subscribe({
      next: (data) => {
        debugger;
        let temp: any = data.filter((x) => x.id == courseid);
        this.CourseName = temp[0].name;
        let courseid = temp[0].courseid;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetCourse');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.AmazeService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }

  public GetChapter() {
    this.AmazeService.GetChapter().subscribe({
      next: (data) => {
        debugger;
        let temp: any = data.filter((x) => x.id == this.id);
        let chapterID = temp[0].chapterID;
        let temp1: any = data.filter((x) => x.id == chapterID);
        this.Chaptername = temp1[0].name;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetChapter');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.AmazeService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }

  public GetMyDetails() {
    this.AmazeService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        let temp: any = data.filter((x) => x.id == this.id);
        let UserID = temp[0].userID;
        let staffdetails: any = data.filter((x) => x.id == UserID);
        this.staffanme = staffdetails[0].name;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetMyDetails');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.AmazeService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }

  public getdetailslist() {
    debugger;
    this.AmazeService.GetTestResponseDetails().subscribe({
      next: (data) => {
        debugger;
        this.detailslist = data.filter((x) => x.testResponseID == this.id);
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetTestResponseDetails');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.AmazeService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }
}
