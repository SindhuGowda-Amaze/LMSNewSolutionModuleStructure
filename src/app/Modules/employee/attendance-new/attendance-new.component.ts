import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-attendance-new',
  templateUrl: './attendance-new.component.html',
  styleUrls: ['./attendance-new.component.css']
})
export class AttendanceNewComponent implements OnInit {
  search: any;
  id: any;
  result: any;
  count: any;
  roleid: any;
  userid: any;
  userName: any;
  Attendance: any=[];
  currentUrl: any;
  employeeID: any;
  trainer: any;
  courseID: any;
  TopicID: any;
  Today: any;
  noofhrs: any;
  EmployeeList: any;
  todaydate: any;
  courseid: any;
  dummyuniqlist: any;
  employeereportlist: any;
  endDate: any;
  uniquelist: any;
  Date: any;
  dummemployeereportlist: any;
  employeeFilterReportList: any;
  Course: any;
  courseList: any;
  EmplID: any;
  AttendanceAddNoOfHrs: any;
  StaffNoofHrs: any;
  StaffNoofHrs1: any;
  TopicList: any

  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }

  ngOnInit(): void {
    this.Course = "0"
    this.courseID = "0"
    this.TopicID = "0"
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid');
    this.userName = sessionStorage.getItem('UserName');

    this.Today = new Date().toISOString().split("T")[0];
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.GetCourseDropdown();
    this.getTopic();
    this.GetAttendance_New();
    this.GetStaffList();
    // this.areYouReallySure = false;
    // this.allowPrompt = true;

  }


  public GetAttendance_New() {
    debugger
    this.StaffNoofHrs=0
    this.LearningService.GetAttendance_New()
      .subscribe({
        next: data => {
          debugger
          if (this.roleid == 4) {
            this.Attendance = data.filter(x => x.trainerID == this.userid && x.filterdate == this.Today);


            for (let i = 0; i < this.Attendance.length; i++) {
              this.StaffNoofHrs = this.Attendance[i].noofhrsinmins
            }
            // this.Attendance = data
          }
          else if (this.roleid == 3) {
            this.Attendance = data.filter(x => x.supervisor == this.userid && x.filterdate == this.Today);
            for (let i = 0; i < this.Attendance.length; i++) {
              this.StaffNoofHrs = this.Attendance[i].noofhrsinmins
            }
          }
          else {
            this.StaffNoofHrs=0
            this.Attendance = data.filter(x => x.empID == this.userid && x.filterdate == this.Today)
           
            for (let i = 0; i < this.Attendance.length; i++) {
              this.StaffNoofHrs = this.Attendance[i].noofhrsinmins
            }
          }
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in GetAttendance_New');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.LearningService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }


  filterbydate() {
    debugger
    this.StaffNoofHrs=0
    this.LearningService.GetAttendance_New().subscribe({
      next: (data) => {
        this.Attendance = data.filter(
          // (x) => x.loginDate >= this.Date && x.loginDate <= this.endDate
          (x) => x.filterdate >= this.Date && x.filterdate <= this.endDate
        );
        for (let i = 0; i < this.Attendance.length; i++) {
          this.StaffNoofHrs += this.Attendance[i].noofhrsinmins
        }
        // const key = 'coursename';
        // this.uniquelist = [
        //   ...new Map(
        //     this.uniquelist.map((item: { [x: string]: any }) => [
        //       item[key],
        //       item,
        //     ])
        //   ).values(),
        // ];
      },
    });
  }

  getcourseid(even: any) {
    debugger;
    this.courseid = even.target.value;
    if (even.target.value != 0) {
      this.uniquelist = this.dummyuniqlist.filter(
        (x: { coursename: any }) => x.coursename == this.courseid
      );

      this.count = this.employeereportlist.length;
    } else {
      this.GetTrainerReport();
    }
  }

  public GetTrainerReport() {
    debugger;
    this.LearningService.GetTestResponse().subscribe({
      next: (data) => {
        debugger;
        this.employeereportlist = data.filter((x) => x.userID == this.userid);

        const key = 'coursename';
        this.uniquelist = [
          ...new Map(
            this.employeereportlist.map((item: { [x: string]: any }) => [
              item[key],
              item,
            ])
          ).values(),
        ];
        this.dummyuniqlist = this.uniquelist;
        this.dummemployeereportlist = data;
        this.employeeFilterReportList = this.employeereportlist;
        this.count = this.employeereportlist.length;
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

  public GetCourseDropdown() {
    this.LearningService.GetCourseDropdown().subscribe({
      next: (data) => {
        debugger;
        this.courseList = data;
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


  getCourseID(even: any) {
    debugger;
    this.courseID = even.target.value;
  }

  public getTopic() {
    debugger;
    this.LearningService.GetChapter().subscribe((data) => {
      debugger;
      this.TopicList = data;
    });
  }

  fileName = 'Attendance Reports.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    debugger;

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    // this.loader = false;
  }



  getEmpID(even: any) {
    debugger;
    this.EmplID = even.target.value;
    this.LearningService.GetAttendance_New()
      .subscribe({
        next: data => {
          debugger
          if (this.roleid == 4) {
            //this.Attendance = data.filter(x => x.trainerID == this.userid && x.filterdate==this.Today && x.empID==this.EmplID );
            this.Attendance = data
            for (let i = 0; i < this.Attendance.length; i++) {
              this.StaffNoofHrs = this.Attendance[i].noofhrsinmins
            }
          }
          else if (this.roleid == 3) {
            this.Attendance = data.filter(x => x.supervisor == this.userid && x.filterdate == this.Today && x.empID == this.EmplID);
            this.AttendanceAddNoOfHrs = data.filter(x => x.supervisor == this.userid && x.filterdate == this.todaydate && x.empID == this.EmplID);
            console.log("this.AttendanceAddNoOfHrs", this.AttendanceAddNoOfHrs)

            for (let i = 0; i < this.Attendance.length; i++) {
              debugger
              this.StaffNoofHrs += this.Attendance[i].noofhrsinmins
            }

            console.log("this.StaffNoofHrs", this.StaffNoofHrs)

          }
          else {
            this.Attendance = data.filter(x => x.empID == this.userid && x.filterdate == this.Today && x.empID == this.EmplID)
            for (let i = 0; i < this.Attendance.length; i++) {
              this.StaffNoofHrs = this.Attendance[i].noofhrsinmins
            }
          }

          //         var today = new Date();
          // today.setHours(today.getHours() + 4);

        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in GetAttendance_New');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.LearningService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public GetStaffList() {
    this.LearningService.GetAllStaffNew().subscribe({
      next: (data) => {
        debugger;
        this.EmployeeList = data.filter(x => x.type != 2 && x.department == 4);
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
}
