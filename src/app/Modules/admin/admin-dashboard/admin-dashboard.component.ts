import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public LearningService: LearningService) { }
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
  coursedetails1:any;
  Assigntrainerlist:any;
  countAssignTrainer:any;
  countAdminTrainercourse:any;
  
  ngOnInit(): void {
    this.userid = sessionStorage.getItem('userid')
    this.roleid = sessionStorage.getItem('roleid')
    this.temp = sessionStorage.getItem('temp');
    this.GetAllCounts();
    this.GetCourse();
    if (this.userid == 10348) {
      this.showenrolment = 1;
    }
    else {
      this.showenrolment = 0;;
    }
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

  public GetAllCounts() {
    debugger
    if (this.userid != 10348) {
      this.LearningService.GetAllCounts(this.userid, 2).subscribe(
        data => {
          debugger
          this.countlist = data[0];
        })
    }
    else {
      this.LearningService.GetAllCounts(10348, 1).subscribe(
        data => {
          debugger
          this.countlist = data[0];
        })
    }

  }

  public GetCourse() {
    debugger
    if (this.userid == 10348) {
      // this.LearningService.GetEnroll().subscribe(
      //   data => {
      //     debugger
      //     this.coursedetails = data.filter(x => x.staffID == this.userid && x.status == 'Manager Approved');
      //     console.log(" this.coursedetails", this.coursedetails.length)
      //   })

        this.LearningService.GetCourseDropdown().subscribe(
          data => {
            debugger
            this.coursedetails = data
            console.log(" this.coursedetails", this.coursedetails.length)
          })

      this.LearningService.GetTrainerCourseMappingByEnroll().subscribe(
        data => {
          debugger
          if(this.roleid==1){
            this.trainerlist = data;
            console.log(this.trainerlist)
          }
          else{
            this.trainerlist = data.filter(x => x.staffID == this.userid && x.status == 'Manager Approved');
          }
        
        })

        this.LearningService.GetChapter().subscribe(
          data => {
            debugger
            this.chapterlist = data;
          })

        this.LearningService.GetTrainerCourseMappingDashboard().subscribe(
          data => {
            debugger
         
              this.Assigntrainerlist = data;
              console.log(this.Assigntrainerlist)
         this.countAdminTrainercourse =this.Assigntrainerlist.length;
          })


      

        this.LearningService.GetChapterAssessment().subscribe(
          data => {
            debugger
            this.assesmentlist = data;
            debugger
          })

      this.LearningService.GetEnrollCourseChapters().subscribe(
        data => {
          debugger
          this.chapterlist = data.filter(x => x.staffID == this.userid && x.status == 'Manager Approved');
        })
    }

    else {
      // this.LearningService.GetCourseDropdown().subscribe(
      //   data => {
      //     debugger
      //     this.coursedetails = data;
      //   })
    
            this.LearningService.GetApproveCourse(this.userid).subscribe(data => {
            debugger
            this.coursedetails = data;
            this.courseCount = this.coursedetails.length;
            debugger
          })
      

        this.LearningService.GetEnrollCourseChapters().subscribe(
          data => {
            debugger
            this.chapterlist = data.filter(x => x.staffID == this.userid && x.status == 'Manager Approved');
          })
  


      this.LearningService.GetTrainerCourseMappingByEnroll().subscribe(
        data => {
          debugger
          this.trainerlist = data;
        })

        this.LearningService.GetEnrollCourseChaptersAssessment().subscribe(
          data => {
            debugger
            this.assesmentlist = data.filter(x => x.staffID == this.userid && x.status == 'Manager Approved');
            debugger
          })

          this.LearningService.GetTrainerCourseMappingDashboard().subscribe(
            data => {
              debugger
           
                this.Assigntrainerlist = data.filter(x => x.staffID == this.userid && x.status == 'Manager Approved');
                console.log(this.Assigntrainerlist)
           this.countAssignTrainer=this.Assigntrainerlist.length;
            })



      // this.LearningService.GetEnroll().subscribe(
      //   data => {
      //     debugger
      //     this.chapterlist = data;
      //   })

    }

  }

  public GetApproveCourse() {
    debugger
        this.LearningService.GetApproveCourse(this.userid).subscribe(data => {
        debugger
        this.coursedetails = data;
        this.courseCount = this.coursedetails.length;
        debugger
      })
    }
}

