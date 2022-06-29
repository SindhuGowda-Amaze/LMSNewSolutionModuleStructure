import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessmentdashboard',
  templateUrl: './assessmentdashboard.component.html',
  styleUrls: ['./assessmentdashboard.component.css']
})
export class AssessmentdashboardComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }
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
  correctAnswers: any
  ngOnInit(): void {
    this.GetAssessmentResult()
    this.GetAssessments();
    this.GetCourse();
    this.GetQuestionMaster();
    this.question1 = 0;
    this.course = 0;

    this.LearningService.GetTestResponse().subscribe(
      data => {
        debugger
        // this.result = data.filter(x => x.manager == this.manager );
        this.result = data;
      })
  }

  course: any;
  question1: any;


  getcourseid(even: any) {
    debugger
    this.course = even.target.value;
    if (this.course == 0) {
      debugger
      this.LearningService.GetAssessments().subscribe(
        data => {
          debugger
          this.quetionlist = data;
          console.log("questionlist", this.quetionlist)
          this.dummquetionlist = data;
          this.count = this.quetionlist.length;
        })

    }

    else {
      this.LearningService.GetAssessments().subscribe(
        data => {
          debugger
          this.quetionlist = this.dummquetionlist.filter((x: { questionID: any, courseID: any }) => x.courseID == this.course)
          console.log("questionlist", this.quetionlist)
          this.dummquetionlist = data;

          this.count = this.quetionlist.length;
        })

    }

   // this.GetFilteredCourseID();

  }

  public GetFilteredCourseID() {
    this.LearningService.GetAssessments().subscribe(data => {
      debugger
      this.quetionlist = data.filter(x => x.courseID == this.courseid)

    })
  }




  courselist: any;
  public GetCourse() {
    debugger
    this.LearningService.GetCourseDropdown().subscribe(
      data => {
        debugger
        this.courselist = data;
      })
  }


  questiontype: any;
  dummquestiontype: any;
  public GetQuestionMaster() {
    debugger
    this.LearningService.GetQuestionMaster().subscribe(
      data => {
        debugger
        this.questiontype = data;

      })
  }

  assessmentlist: any;
  public GetAssessmentResult() {
    debugger
    this.LearningService.GetAssessmentResult().subscribe(
      data => {
        debugger
        this.assessmentlist = data;
      })
  }



  dummquetionlist: any;
  public GetAssessments() {
    debugger
    this.LearningService.GetAssessments().subscribe(
      data => {
        debugger
        this.quetionlist = data;
        console.log("questionlist", this.quetionlist)
        this.dummquetionlist = data;
        this.count = this.quetionlist.length;
      })
  }

  public Ondelete(id: any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: "Do you want to delete the Selected Record",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value == true) {
        this.LearningService.DeleteAssessments(id).subscribe(
          data => {
            debugger
            this.GetAssessments();
          }
        )
        Swal.fire('Successfully Deleted...!');
        this.ngOnInit();
      }
    });
  }


  checkbutton() {
    location.href = "/Checkanswer"
  }


  getquestion(even: any) {
    if (even.target.value == 0) {
      this.LearningService.GetAssessments().subscribe(
        data => {
          debugger
          this.quetionlist = this.dummquetionlist.filter((x: { questionID: any, courseID: any }) => x.courseID == this.course)
          console.log("questionlist", this.quetionlist)
          this.dummquetionlist = data;

          this.count = this.quetionlist.length;
        })



    }
    else {
      this.LearningService.GetAssessments().subscribe(
        data => {
          debugger
          this.quetionlist = this.dummquetionlist.filter((x: { questionID: any, courseID: any }) => x.questionID == this.question1 && x.courseID == this.course)
          console.log("questionlist", this.quetionlist)
          this.dummquetionlist = data;

          this.count = this.quetionlist.length;
        })
    }
  }










}
