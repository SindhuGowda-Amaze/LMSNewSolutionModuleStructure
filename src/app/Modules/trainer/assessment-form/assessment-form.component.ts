import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css']
})
export class AssessmentFormComponent implements OnInit {


    constructor(public LearningService: LearningService, public ActivatedRoute: ActivatedRoute) { }
    CourseList: any;
    ChapterList: any;
    QuestionList: any;
    id: any;
    userid:any;
    files1: File[] = [];
    files: File[] = [];
    quetionlist:any
    entity:any
    Course_Photo: any;
    Attachment: any;
    result: any;
    result1: any;
    results: any;
    courseid: any;
    chapterid: any;
    questionid: any;
    courseName: any;
    Question: any;
    Option1: any;
    Option2: any;
    Option3: any;
    Option4: any;
    CorrectAnswer: any;
    Weightage: any;
    AssessmentName: any;
    tablecout: any;
    assessmenrArray: any = [];
    type:any
    dumchapterlist: any;
    show: any;
    show2: any;
  
    ngOnInit(): void {
      // this.GetAssessments();
      this.courseid=0;
      this.chapterid=0;
      this.questionid=0;
      this.userid = sessionStorage.getItem('userid');
      this.GetAssessments();
      this.ActivatedRoute.params.subscribe(params => {
        debugger
        this.id = params["id"];
        if (this.id != null && this.id != undefined) {
          this.GetAssessments();
        }
      })
      this.GetQuestionMaster();
      this.ActivatedRoute.params.subscribe(params => {
        debugger
        this.questionid = params["id"];
        if (this.questionid != null && this.questionid != undefined) {
          this.GetQuestionMaster();
        }
      })
  
      this.GetChapter();
      this.ActivatedRoute.params.subscribe(params => {
        debugger
        this.chapterid = params["id"];
        if (this.chapterid != null && this.chapterid != undefined) {
          this.GetChapter();
        }
      })
  
      this.GetCourse();
      this.ActivatedRoute.params.subscribe(params => {
        debugger
        this.courseid = params["id"];
        if (this.courseid != null && this.courseid != undefined) {
          this.GetCourse();
        }
      })
    }
  
    public GetAssessments() {
      debugger
      this.LearningService.GetAssessments().subscribe(
        data => {
          debugger
          this.quetionlist = data;
          this.type= this.quetionlist[0].type
        })
    }
  
    public GetQuestionMaster() {
      debugger
      this.LearningService.GetQuestionMaster().subscribe(
        data => {
          debugger
          this.QuestionList = data;
        })
    }
  
    public GetChapter() {
      debugger
      this.LearningService.GetChapter().subscribe(
        data => {
          debugger
          this.dumchapterlist = data;
        })
    }
    public GetCourse() {
      debugger
      this.LearningService.GetCourse().subscribe(
        data => {
          debugger
          this.CourseList = data;
        })
    }
  
    cancel() {
      location.href = "#/Assessmentdashboard";
    }
    
    ADd() {
      debugger
      if(this.courseid==undefined || this.chapterid==undefined || this.questionid==undefined || this.Question==
        undefined|| this.Weightage==undefined || this.CorrectAnswer==undefined || this.CorrectAnswer=="")
      {
        Swal.fire("Please fill all the fields");
      }
    else{
      this.tablecout = 1;
      var json = {
        "CourseID": this.courseid,
        "ChapterID": this.chapterid,
        "QuestionID": this.questionid,
        "Question": this.Question,
        "Option1": this.Option1,
        "Option2": this.Option2,
        "Option3": this.Option3,
        "Option4": this.Option4,
        "CorrectAnswer": this.CorrectAnswer,
        "weightage": this.Weightage,
        "AssessmentName": this.AssessmentName,
      };
    
      this.assessmenrArray.push(json)
      this.Question="";
      this.Option1="";
      this.Option2="";
      this.Option3="";
      this.Option4="";
      this.Weightage="";
      this.AssessmentName="";
      Swal.fire("Saved Successfully");
    }
    }
  
    getCorrectAnswer(event: any) {
      debugger
      let value: any = event.target.value;
      if (value == 'A') {
        this.CorrectAnswer = this.Option1;
      }
      if (value == 'B') {
        this.CorrectAnswer = this.Option2;
      }
      if (value == 'C') {
        this.CorrectAnswer = this.Option3;
      }
      if (value == 'D') {
        this.CorrectAnswer = this.Option4;
      }
    }
  
    save() {
      debugger
      for (let i = 0; i <=this.assessmenrArray.length; i++) {
        debugger
      var entity = {
          "CourseID": this.assessmenrArray[i].CourseID,
          "ChapterID": this.assessmenrArray[i].ChapterID,
          "QuestionID": this.assessmenrArray[i].QuestionID,
          "Question": this.assessmenrArray[i].Question,
          "Option1": this.assessmenrArray[i].Option1,
          "Option2": this.assessmenrArray[i].Option2,
          "Option3": this.assessmenrArray[i].Option3,
          "Option4": this.assessmenrArray[i].Option4,
          "CorrectAnswer": this.assessmenrArray[i].CorrectAnswer,
          "weightage": this.assessmenrArray[i].weightage,
          "AssessmentName": this.assessmenrArray[i].AssessmentNames,
          // "TrainerID":this.assessmenrArray[i].TrainerID
        };
        debugger
          this.LearningService.InsertAssessments(entity).subscribe(
        (data:any) => {
          debugger
          let id = data;
          if(data!=0)
          {
            Swal.fire("Saved Successfully");
            location.href="#/Assessmentdashboard";
          }
          else{
            Swal.fire("Name Already Exists");
          }
        })
      }  
    }
  
    getcourseid(even: any) {
      this.courseid = even.target.value;
      this.ChapterList = this.dumchapterlist.filter((x: { courseID: any; }) => x.courseID == this.courseid)
    }
  
    update() {
      debugger
      var entity = {
        "ID":this.id,
          "CourseID": this.courseid,
          "ChapterID": this.chapterid,
          "QuestionID": this.questionid,
          "Question": this.Question,
          "Option1": this.Option1,
          "Option2": this.Option2,
          "Option3": this.Option3,
          "Option4": this.Option4,
          "CorrectAnswer": this.CorrectAnswer,
          "weightage": this.Weightage,
          "AssessmentName": this.AssessmentName
        };
        debugger
        this.LearningService.UpdateAssessments(entity).subscribe(
          data => {
            debugger
            let id = data;
            // this.GetAssessments();
           Swal.fire("Updated Successfully!!");
           location.href = "#/Assessmentdashboard"
          })  
          // this.ngOnInit();    
          // this.tablecout = 0;  
    }
  }
  
