import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { LearningService } from 'src/app/Pages/Services/learning.service';

@Component({
  selector: 'app-my-course-dashboard',
  templateUrl: './my-course-dashboard.component.html',
  styleUrls: ['./my-course-dashboard.component.css']
})
export class MyCourseDashboardComponent implements OnInit {
  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }
  show: any;
  stafflist: any;
  userid: any;
  search: any;
  managlist: any;
  manageremail: any;
  loader: any;
  coursedetails: any;
  result: any;
  trainerCourseMapList: any;

  ngOnInit(): void {
    this.loader = false;
    this.manager = sessionStorage.getItem('manager')
    this.userid = sessionStorage.getItem('userid')
    // this.GetTrainerCourseMapping();
    this.GetEmpcoursecounts();
    this.Showcards(2);
    this.show=2;
    this.GetAllCounts();
    this.Showcards(2);
    this.GetMyDetails();
    // this.loader=true
    // debugger
    // this.LearningService.GetTrainerCourseMapping().subscribe(data => {
    //   debugger
    //   this.coursedetails = data;
    //   debugger
    // })
    // this.loader=false

  }

 public GetMyDetails(){

  this.LearningService.GetMyDetails().subscribe(data => {
    debugger
    this.stafflist = data.filter(x => x.id == this.userid);
    this.managlist = data.filter(x=>x.id==this.manager)    
    this.manageremail=this.managlist[0].emailID

  });


  }


  // public GetTrainerCourseMapping() {
  //   this.loader=true;
  //   debugger
  //   this.LearningService.GetTrainerCourseMapping().subscribe(
  //     data => {
  //       debugger
  //       this.result = data;
  //       this.trainerCourseMapList=data;
  //       this.loader=false;
  //     })
  // }


  coursedetails1: any;
  // public GetTrainerCourseMapping() {
  //   this.loader=true
  //   debugger
  //   this.LearningService.GetTrainerCourseMapping().subscribe(data => {
  //     debugger
  //     this.coursedetails1 = data;
  //     debugger
  //   })
  //   this.loader=false
  // }




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
  Showcards(value: any) {
    this.loader = true;
    this.show = value;
    if (value == 1) {
      this.GetApproveCourse();
    }
    else if (value == 2) {
      debugger
      // this.LearningService.GetEnroll().subscribe(data => {
      //   debugger
      //   this.coursedetails = data.filter((x: { staffID: any; completed: number }) => x.completed == 0 && x.staffID == this.userid);
      // });
      this.GetApproveCourse();
    }
    else if (value == 3) {
      debugger
      //  this.coursedetails = this.trainerCourseMapList.filter((x: { staffID: any; completed: number; enrollid: number; })=> x.staffID==this.userid && x.completed!=1 && x.enrollid==0);
      this.LearningService.GetTrainerCourseMapping().subscribe(data => {
        debugger
        this.coursedetails = data.filter((x: { staffID: any; completed: number; enrollid: number; }) => x.completed != 1 && x.enrollid == 0);
      });

    }
    else if (value == 4) {
      this.LearningService.GetCourse().subscribe(data => {
        debugger
        this.coursedetails = data.filter(x => x.completed == 1 && x.enrollid != 0 && x.staffID == this.userid);
      });
    }
    this.loader = false;
  }

  getcourseid(id: any) {
    this.courseid = id;
  }

  latestcoursedetails: any;
  lastassigned: any;
  public GetApproveCourse() {
    debugger
    this.LearningService.GetApproveCourse(this.userid).subscribe(data => {
      debugger
      this.coursedetails = data.filter(x => x.completed == 0 && x.enrollid != 0 && x.staffid==this.userid);
      console.log( this.coursedetails)
      this.latestcoursedetails = data[0];
      if (this.latestcoursedetails.length = 0) {
        this.lastassigned = 0;
        this.show = 0
      }
      else {
        this.lastassigned = 1;
        // this.show=1
      }

      debugger
    })
  }


  testresponse: any;
  GetTestResponse() {
    this.LearningService.GetTestResponse().subscribe(data => {
      debugger
      this.testresponse = data;
    });
  }


  GetCourse() {
    this.LearningService.GetCourse().subscribe(data => {
      debugger
      this.coursedetails = data.filter(x => x.staffID == this.userid)
    });
  }



  manager: any;
  course: any
  name: any;
  mobile: any;
  emailID: any;
  courseid: any;
  enroll(name: any, mobile: any, emailID: any) {
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
        debugger
        var json = {
          "staffid": this.userid,
          "manager": this.manager,
          "courseid": this.courseid,
          "status": 'Manager Pending',
          "employeeName": name,
          "phoneNo": mobile,
          "email": emailID,
          "type": 'Request to Manager'
        };
        this.LearningService.InsertEnroll(json).subscribe(
          data => {
            debugger
            let id = data;
            if (id != 0) {
              Swal.fire(
                'Request Sent',
                'Your request has been sent to manager for Approval',
                'success'
              );
              location.href = "#/Catalog"
            }
            else {
              Swal.fire("Already Enrolled")
            }
          })

        location.href = "#/Catalog";
      }
    });
  }

  countlist: any;
  public GetAllCounts() {
    debugger
    this.LearningService.GetAllCounts(this.userid, 2).subscribe(
      data => {
        debugger
        this.countlist = data[0];
      })
  }

  empcountlist: any;
  public GetEmpcoursecounts() {
    debugger
    this.LearningService.GetEmpcoursecounts(this.userid).subscribe(
      data => {
        debugger
        this.empcountlist = data[0];
      })

  }


  getenrollid(id: any) {
    debugger
    this.LearningService.UpdateEmpCoursedetails(id).subscribe(
      data => {
        debugger
        this.empcountlist = data[0];
      })

  }





}
