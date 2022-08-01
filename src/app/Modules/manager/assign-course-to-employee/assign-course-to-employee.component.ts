import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-course-to-employee',
  templateUrl: './assign-course-to-employee.component.html',
  styleUrls: ['./assign-course-to-employee.component.css']
})
export class AssignCourseToEmployeeComponent implements OnInit {

  constructor(private LearningService: LearningService, private ActivatedRoute: ActivatedRoute) { }

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
  id:any;
  coursename:any;
  count:any;

  ngOnInit(): void {
    // this.GetEnroll();
    this.GetCourse();
    this.GetStaff();  
    this.name123=0;
    this.courseid=0;
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
    debugger
    this.LearningService.GetCourseDropdown().subscribe(
      data => {
        debugger
        this.courselist = data;
        this.count = this.courselist.length;
      })
  }
 
  public GetStaff() {
    this.LearningService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.id != this.userid && x.role != 'Admin'&& x.supervisor==this.userid)
      this.count=this.stafflist.length;
      // this.name= this.stafflist[0].employeeName
      // this.mobile=this.stafflist[0].phoneNo
      // this.emailID=this.stafflist[0].emailID
    });
  }

  Cancel() {
    location.href = "/Manager/AssignCourseDashboard";
  }
  // public getcoureid(id: any) {
  //   this.staffId = id
  // }
  employeeName:any;
  public getdata(even: any) {
    this.staffId = even.target.value;

    this.LearningService.GetMyDetails().subscribe(
      data => {
        debugger
        let temp: any = data.filter(x => x.id == this.staffId);
        this.employeeName = temp[0].name;
        this.mobile = temp[0].phoneNo;
        this.emailID = temp[0].emailID;
      
      })
  }

  enroll() {
    debugger
    if (this.name123 == undefined || this.courseid == undefined) {
      Swal.fire("Please fill all the fields");
    }
    else {
      var json = {
        "employeeName": this.employeeName,
        // "name": this.coursename,
        "staffid": this.name123,
        "manager": this.userid,
        "courseid": this.courseid,
        "status": 'Manager Assign',
        "phoneNo": this.mobile,
        "email": this.emailID,
        "type": "Manager Assign"
      }
      this.LearningService.InsertEnroll(json).subscribe(
        data => {
          debugger
          let id = data;
          Swal.fire('Course Assigned Successfully!!!');
          location.href = "#/AssignCourseDashboard";
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


  Update(){
    debugger
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



