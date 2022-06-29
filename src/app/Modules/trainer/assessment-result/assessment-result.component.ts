import { Component, ElementRef, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assessment-result',
  templateUrl: './assessment-result.component.html',
  styleUrls: ['./assessment-result.component.css']
})
export class AssessmentResultComponent implements OnInit {

  constructor(private AmazeService: LearningService, private ActivatedRoute: ActivatedRoute, private elementRef: ElementRef, public router: Router) {
  }
  id: any;
  Totalmarks: any;
  CourseName: any;
  Chaptername: any;
  staffanme: any;
  ObtainedMarks: any;
  correctAnswers: any;
  wronganswers: any;
  date: any;
  TestResult: any
  ngOnInit(): void {
    debugger
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params['id'];
      this.AmazeService.GetTestResponse().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.id == this.id);
        let courseid = temp[0].courseID;
        let chapterID = temp[0].chapterID;
        this.AmazeService.GetCourse().subscribe(data => {
          debugger
          let temp: any = data.filter(x => x.id == courseid);
          this.CourseName = temp[0].name

        });

        this.AmazeService.GetChapter().subscribe(data => {
          debugger
          let temp1: any = data.filter(x => x.id == chapterID);
          this.Chaptername = temp1[0].name;
        });
        let UserID = temp[0].userID;
        this.AmazeService.GetMyDetails().subscribe(data => {
          debugger
          let staffdetails: any = data.filter(x => x.id == UserID);
          this.staffanme = staffdetails[0].name;

        });
        this.Totalmarks = temp[0].totalmarks;
        this.date = temp[0].modifiedDate;
        this.TestResult = temp[0].testResult;
        this.ObtainedMarks = temp[0].obtainedMarks;
        this.correctAnswers = temp[0].correctAnswers;
        this.wronganswers = temp[0].wronganswers;


      });

    }
    )
  }

  detailslist: any;

  public getdetailslist() {
    debugger
    this.AmazeService.GetTestResponseDetails().subscribe(data => {
      debugger
      this.detailslist = data.filter(x => x.testResponseID == this.id);
    });
  }

}
