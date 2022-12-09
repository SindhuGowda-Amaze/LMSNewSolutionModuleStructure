import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-course-to-employee',
  templateUrl: './assign-course-to-employee.component.html',
  styleUrls: ['./assign-course-to-employee.component.css'],
})
export class AssignCourseToEmployeeComponent implements OnInit {
  constructor(
    private LearningService: LearningService,
    private ActivatedRoute: ActivatedRoute
  ) { }

  courselist: any;
  userid: any;
  stafflist: any;
  type: any;
  manager: any;
  courseid: any;
  name: any;
  mobile: any;
  emailID: any;
  staffId: any;
  name123: any;
  stafflist1: any;
  id: any;
  coursename: any;
  count: any;
  currentUrl: any;
  pip: any;
  Learning: any;
  tablecount: any;
  trainingresultArray: any = [];
  toBeCompletedDate: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    // this.GetEnroll();
    this.GetCourse();
    this.GetStaff();
    this.name123 = 0;
    this.courseid = 0;
    this.userid = sessionStorage.getItem('userid');
    this.manager = sessionStorage.getItem('UserName');

    // this.ActivatedRoute.params.subscribe(params => {
    //   debugger
    //   this.id = params["id"];
    //   if (this.id != null && this.id != undefined) {
    //     this.GetEnroll();
    //     this.GetCourse();
    //     this.GetStaff();
    //   }
    // })
  }

  public GetCourse() {
    debugger;
    this.LearningService.GetCourseDropdown()
      .subscribe({
        next: (data) => {
          debugger;
          this.courselist = data;
          this.count = this.courselist.length;
        },
        error: (err: { error: { message: any; }; }) => {
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

  public GetStaff() {
    this.LearningService.GetMyDetails()
      .subscribe({
        next: (data) => {
          debugger;
          this.stafflist = data.filter(
            (x) =>
              x.id != this.userid &&
              x.role != 'Admin' &&
              x.supervisor == this.userid
          );
          this.count = this.stafflist.length;
          // this.name= this.stafflist[0].employeeName
          // this.mobile=this.stafflist[0].phoneNo
          // this.emailID=this.stafflist[0].emailID
        },
        error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in GetMyDetails');
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
  mandatory: any;


  public on1() {
    this.mandatory = 1;
    this.Learning = 0;
    this.pip = 0;
  }

  public on2() {
    this.mandatory = 0;
    this.Learning = 1;
    this.pip = 0;
  }

  public on3() {
    this.mandatory = 0;
    this.Learning = 0;
    this.pip = 1;
  }

  Cancel() {
    location.href = '#/Manager/AssignCourseDashboard';
  }
  // public getcoureid(id: any) {
  //   this.staffId = id
  // }
  employeeName: any;
  enrolledList: any;
  public getdata(even: any) {
    debugger
    this.staffId = even.target.value;

    this.LearningService.GetMyDetails()
      .subscribe((data) => {
        debugger;
        let temp: any = data.filter((x) => x.id == this.staffId);
        this.employeeName = temp[0].name;
        this.mobile = temp[0].phoneNo;
        this.emailID = temp[0].emailID;
      });

    this.LearningService.GetEnroll()
      .subscribe((data) => {
        debugger;
        this.enrolledList = data.filter((x) => x.staffID == this.staffId);
      });

    this.LearningService.GetCourseDropdown()
      .subscribe((data) => {
        debugger;
        for (let i = 0; i < this.enrolledList.length; i++) {
          this.courselist = data.filter((x) => x.id != this.enrolledList[i].courseID);
        }


      });


  }

  ECourseID: any
  courseName123: any;
  courseID12: any;
  public getcourseID(even: any) {
    this.ECourseID = even.target.value;

    this.LearningService.GetCourseDropdown()
      .subscribe((data) => {
        debugger;
        let temp: any = data.filter((x) => x.id == this.ECourseID);
        this.courseName123 = temp[0].name;
        this.courseID12 = temp[0].id;

      });






  }
  // enroll() {
  //   debugger;
  //   if (this.name123 == undefined || this.courseid == undefined) {
  //     Swal.fire('Please fill all the fields');
  //   } else {
  //     var json = {
  //       employeeName: this.employeeName,
  //       // "name": this.coursename,
  //       staffid: this.name123,
  //       manager: this.userid,
  //       courseid: this.courseid,
  //       status: 'Manager Assign',
  //       phoneNo: this.mobile,
  //       email: this.emailID,
  //       type: 'Manager Assign',
  //       Mandatory: this.mandatory == undefined ? 0 : this.mandatory,
  //       PIP: this.pip == undefined ? 0 : this.pip,
  //       LearningPath: this.Learning == undefined ? 0 : this.Learning
  //     };
  //     this.LearningService.InsertEnroll(json)
  //       .subscribe((data) => {
  //         debugger;
  //         let id = data;
  //         Swal.fire('Course Assigned Successfully!!!');
  //         location.href = '#/Manager/AssignCourseDashboard';
  //       });
  //   }
  // }

  public EnrollMultipleTraining() {
    debugger
    if (this.name123 == undefined || this.courseid == undefined || this.toBeCompletedDate == undefined) {
      Swal.fire('Please fill all the fields');
    }
    else {
      this.LearningService.GetTrainerCourseMapping()
        .subscribe({
          next: data => {
            debugger
            let trainerlist = data
            this.tablecount = 1;
            var json = {
              employeeName: this.employeeName,
              courseName: this.courseName123,
              mandatory: this.mandatory == undefined ? 0 : this.mandatory,
              pip: this.pip == undefined ? 0 : this.pip,
              learningPath: this.Learning == undefined ? 0 : this.Learning,
              staffid: this.name123,
              manager: this.userid,
              toBeCompletedDate: this.toBeCompletedDate,
              courseID12: this.courseID12,
              status: 'Manager Assign',
              phoneNo: this.mobile,
              email: this.emailID,
              type: 'Manager Assign',
            };
            debugger

            this.trainingresultArray.push(json);
            this.name123 = "";
            this.courseid = "";
            this.mandatory = "";
            this.pip = "";
            this.Learning = "";
            this.toBeCompletedDate = "";
            this.mandatory = undefined;
            this.pip = undefined;
            this.Learning = undefined;
          }
        })
    }

    this.LearningService.GetCourseDropdown()
    .subscribe({
      next: (data) => {
        debugger;
        this.courselist = data.filter(x=>x.id!=this.courseid)
        this.count = this.courselist.length;
      },
      error: (err: { error: { message: any; }; }) => {
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

  public InsertEnrollTraining() {
    debugger
    debugger
    for (let i = 0; i < this.trainingresultArray.length; i++) {
      if (this.trainingresultArray.length == 0) {
        Swal.fire('Please Select Training For Staff')
      }

      var entity = {
        EmployeeName: this.trainingresultArray[i].employeeName,
        StaffID: this.trainingresultArray[i].staffid,
        manager: this.trainingresultArray[i].manager,
        CourseID: this.trainingresultArray[i].courseID12,
        Status: this.trainingresultArray[i].status,
        PhoneNo: this.trainingresultArray[i].phoneNo,
        Email: this.trainingresultArray[i].email,
        type: this.trainingresultArray[i].type,
        Mandatory: this.trainingresultArray[i].mandatory == undefined ? 0 : this.trainingresultArray[i].mandatory,
        PIP: this.trainingresultArray[i].pip == undefined ? 0 : this.trainingresultArray[i].pip,
        LearningPath: this.trainingresultArray[i].learningPath == undefined ? 0 : this.trainingresultArray[i].learningPath,
        toBeCompletedDate: this.toBeCompletedDate
      };
      this.LearningService.InsertEnroll(entity).subscribe(
        data => {
          debugger
          if (data == 0) {
            Swal.fire("Staff Already Enrolled for this Course")
          }
          else {
            let traininglist = data;
            Swal.fire("Course Assigned Successfully!!!");
            location.href = '#/Manager/AssignCourseDashboard';
            this.tablecount = 0;
            location.reload();
          }

        })

    }
  }

  // assignList:any;
  // public GetEnroll(){
  //   this.LearningService.GetEnroll().subscribe(
  //     data => {
  //       debugger
  //       this.assignList =  data.filter(x => x.type == 'Manager Assign')
  //       this.name123= this.assignList[0].staffId
  //       this.courseid= this.assignList[0].courseid

  //     })
  // }

  Update() {
    debugger;
    //  var json = {
    //   "employeeName": this.name123,
    //   "courseid": this.courseid ,
    //   "status": 'Manager Assign',
    //   "type": "Manager Assign"
    //   };

    //   this.LearningService.UpdateEnroll(json).subscribe(
    //     data => {
    //     debugger
    //     let id = data;
    //     Swal.fire("Successfully Updated...!");
    //     location.href="#/AssignCourseDashboard";
    //   })
  }
}
