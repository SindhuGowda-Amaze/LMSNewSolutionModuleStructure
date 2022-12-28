import { Component, OnInit } from '@angular/core';

import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-assessment-report',
  templateUrl: './employee-assessment-report.component.html',
  styleUrls: ['./employee-assessment-report.component.css'],
})
export class EmployeeAssessmentReportComponent implements OnInit {
  constructor(
    private LearningService: LearningService,
    private ActivatedRoute: ActivatedRoute
  ) {}
  userid: any;
  search: any;
  dummemployeereportlist: any;
  traininglist: any;
  employeereportlist: any;
  courseid: any;
  count: any;
  departmentid: any;
  dumdeptlist: any;
  departmentlist: any;
  courseID: any;
  courselist: any;
  TrainerID: any;
  trainerlist: any;
  currentUrl: any;
  value : any
  viewMode = 'tab1';

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.userid = sessionStorage.getItem('userid');
    this.roleid = sessionStorage.getItem('roleid');
    this.staffid = sessionStorage.getItem('userid');
    // this.manager = sessionStorage.getItem('manager');
    this.trainer = sessionStorage.getItem('trainerid');
    this.year=""
    this.courseID="0"
    this.TrainerID="0"
    this.TopicID="0"
    this.GetTrainerReport();
    this.GetDepartmentMaster();
    this.getcourse();
    this.getTopic();
  }
  uniquelist:any;
  public GetTrainerReport() {
    debugger;
    this.LearningService.GetTrainerReport(0, 0)
    .subscribe({
      next: (data) => {

        
        debugger;
      let temp = data.filter((x) => x.staffID == this.userid);

        var helper: any = {}
        this.employeereportlist = temp.reduce(function (r: any[], o: { coursename: any; totalmarks: any; obtainedMarks: any; chapterName: any; assessmentDate: any; courseName: any; }) {
          var key = o.chapterName;
          if (!helper[key]) {

            helper[key] = Object.assign({}, o); // create a copy of o

            r.push(helper[key]);

          } else {

           
            helper[key].totalmarks == o.totalmarks;
            helper[key].obtainedMarks == o.obtainedMarks;
           
            helper[key].coursename = o.coursename;
            helper[key].chapterName = o.chapterName;
            helper[key].assessmentDate = o.assessmentDate;
            helper[key].courseName = o.courseName;
          }
          return r;

        }, []);
        // this.detailslist = this.reduceData(temp);

        const key = 'coursename';
        this.uniquelist = [...new Map(this.employeereportlist.map((item: { [x: string]: any; }) =>

          [(item[key]), item])).values()]


        this.courselist = data;
        this.trainerlist = data;
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetTrainerReport');
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

  fileName = 'Employee Assessment Reports.xlsx';
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
  }

  public GetDepartmentMaster() {
    debugger;
    this.LearningService.GetDepartmentMaster()
    .subscribe({
      next: (data) => {
        debugger;
        this.departmentlist = data;
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetDepartmentMaster');
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

  getdepartmentid(even: any) {
    debugger;
    this.departmentid = even.target.value;
    if (even.target.value != 0) {
      this.employeereportlist = this.dummemployeereportlist.filter(
        (x: { departmentID: any }) => x.departmentID == this.departmentid
      );
    } else {
      this.GetTrainerReport();
    }
  }
  

  getcourseid(even: any) {
    debugger;
    this.courseid = even.target.value;
    if (even.target.value != 0) {
      this.employeereportlist = this.employeereportlist.filter(
        (x: { courseName: any }) => x.courseName == this.courseid
      );


      const key = 'coursename';
      this.uniquelist = [...new Map(this.employeereportlist.map((item: { [x: string]: any; }) =>

        [(item[key]), item])).values()]



      this.count = this.employeereportlist.length;

      
    // this.LearningService.GetCourse().subscribe((data) => {
    //   debugger;
    //   this.TopicList = data.filter(x=>x.name==this.courseID)

    //   const key = 'name';
    //   this.uniquelist1 = [...new Map(this.TopicList.map((item: { [x: string]: any; }) =>

    //     [(item[key]), item])).values()]


    // });

    } else {
      this.GetTrainerReport();
    }
  }

  
  enroll :any
public GetEnroll(){
  this.LearningService.GetEnroll().subscribe({
    next: (data) => {
      debugger;
      this.enroll = data;

      
      const key = 'coursename';
      this.uniquelist = [...new Map(this.enroll.map((item: { [x: string]: any; }) =>

        [(item[key]), item])).values()]
    }
  })
}

  FilterByYear() {
    debugger;
    this.employeereportlist = this.employeereportlist.filter((x: { year: any }) => x.year == this.year
    );

  }


  topicID : any
  gettopicID(even: any) {
    debugger;
    this.topicID = even.target.value;
    if (even.target.value != 0) {
      this.employeereportlist = this.employeereportlist.filter((x: { chapterName: any }) => x.chapterName == this.topicID 
      );


      const key = 'chapterName';
      this.uniquelist = [...new Map(this.employeereportlist.map((item: { [x: string]: any; }) =>

        [(item[key]), item])).values()]



      this.count = this.employeereportlist.length;
    } else {
      this.GetTrainerReport();
    }
  }

  getCourseID(even: any) {
    debugger;
    this.courseID = even.target.value;
  }
  getTopicID(even: any) {
    debugger;
    this.topicID = even.target.value;
  }

  getTrainerID(even: any) {
    debugger;
    this.TrainerID = even.target.value;
  }
  result:any;
  public GetTrainer() {
    debugger;
    this.LearningService.GetTrainer().subscribe((data) => {
      debugger;
      this.trainerlist = data;
    });
  }
  
  Courselist:any;
  public getcourse() {
    debugger;
    this.LearningService.GetEnroll().subscribe((data) => {
      debugger;
      this.Courselist = data;

      const key = 'courseName';
      this.uniquelist = [...new Map(this.Courselist.map((item: { [x: string]: any; }) =>

        [(item[key]), item])).values()]

      
    });


  }

  TopicList:any
  TopicID:any;
  uniquelist1 : any
  name : any
  public getTopic() {
    debugger;
    this.LearningService.GetChapter().subscribe((data) => {
      debugger;
      this.TopicList = data

      const key = 'name';
      this.uniquelist1 = [...new Map(this.TopicList.map((item: { [x: string]: any; }) =>

        [(item[key]), item])).values()]


    });

    
  }

  // TopicList:any
  // TopicID:any;
  // public getTopic() {
  //   debugger;
  //   this.LearningService.GetChapter().subscribe((data) => {
  //     debugger;
  //     this.TopicList = data;
  //   });
  // }




  AssessmentDocList:any;
  public GetClassRoomAssessmentDocument() {
    debugger;
    this.LearningService.GetClassRoomAssessmentDocument()
    .subscribe({
      next: (data) => {
        debugger;
        this.AssessmentDocList = data;
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetClassRoomAssessmentDocument');
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
  roleid : any
  detailslist : any
  year : any

  public filterByYear(){
    this.LearningService.GetTestResponsenew().subscribe({
      next: (data) => {
        debugger;
        if (this.roleid == 4) {
          let temp: any = data.filter((x) => x.trainerID == this.trainer && x.year==this.year);
          var helper: any = {}
          this.detailslist = temp.reduce(function (r: any[], o: { coursename: any; totalmarks: any; obtainedMarks: any; status: any; startDate: any; endDate: any; }) {
            var key = o.coursename;
            if (!helper[key]) {
  
              helper[key] = Object.assign({}, o); // create a copy of o
  
              r.push(helper[key]);
  
            } else {
  
              helper[key].totalmarks += o.totalmarks;
  
              helper[key].obtainedMarks += o.obtainedMarks;
              helper[key].e_Date = o.coursename;
              helper[key].e_Date = o.status;
              helper[key].e_Date = o.startDate;
              helper[key].e_Date = o.endDate;
            }
            return r;
  
          }, []);
          // this.detailslist = this.reduceData(temp);
  
        }
  
        else if (this.roleid == 2) {
          let temp: any  = data.filter(x => x.userID == this.staffid && x.year==this.year);
          var helper: any = {}
          this.detailslist = temp.reduce(function (r: any[], o: { coursename: any; totalmarks: any; obtainedMarks: any; status: any; startDate: any; endDate: any; }) {
            var key = o.coursename;
            if (!helper[key]) {
  
              helper[key] = Object.assign({}, o); // create a copy of o
  
              r.push(helper[key]);
  
            } else {
  
              helper[key].totalmarks += o.totalmarks;
  
              helper[key].obtainedMarks += o.obtainedMarks;
              helper[key].e_Date = o.coursename;
              helper[key].e_Date = o.status;
              helper[key].e_Date = o.startDate;
              helper[key].e_Date = o.endDate;
            }
            return r;
  
          }, []);
          // this.detailslist = this.reduceData(temp);
  
        }
  
        else {
          let temp: any = data.filter(x=> x.year==this.year);
          var helper: any = {}
          this.detailslist = temp.reduce(function (r: any[], o: { coursename: any; totalmarks: any; obtainedMarks: any; status: any; startDate: any; endDate: any; }) {
            var key = o.coursename;
            if (!helper[key]) {
  
              helper[key] = Object.assign({}, o); // create a copy of o
  
              r.push(helper[key]);
  
            } else {
  
              helper[key].totalmarks += o.totalmarks;
  
              helper[key].obtainedMarks += o.obtainedMarks;
              helper[key].e_Date = o.coursename;
              helper[key].e_Date = o.status;
              helper[key].e_Date = o.startDate;
              helper[key].e_Date = o.endDate;
            }
            return r;
  
          }, []);
          // this.detailslist = this.reduceData(temp);
  
        }
  
        // .filter(x => x.checked == 1);
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetTestResponsenew');
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
  trainer : any
  staffid : any
  public getdetailslist() {
    debugger;
    // this.empid = details.id;
    this.LearningService.GetTestResponsenew().subscribe({
      next: (data) => {
        debugger;
        if (this.roleid == 4) {
          let temp: any = data.filter((x) => x.trainerID == this.trainer);
          var helper: any = {}
          this.detailslist = temp.reduce(function (r: any[], o: { coursename: any; totalmarks: any; obtainedMarks: any; status: any; startDate: any; endDate: any; }) {
            var key = o.coursename;
            if (!helper[key]) {

              helper[key] = Object.assign({}, o); // create a copy of o

              r.push(helper[key]);

            } else {

              helper[key].totalmarks += o.totalmarks;

              helper[key].obtainedMarks += o.obtainedMarks;
              helper[key].e_Date = o.coursename;
              helper[key].e_Date = o.status;
              helper[key].e_Date = o.startDate;
              helper[key].e_Date = o.endDate;
            }
            return r;

          }, []);
          // this.detailslist = this.reduceData(temp);

        }

        else if (this.roleid == 2) {
          let temp: any  = data.filter(x => x.userID == this.staffid);
          var helper: any = {}
          this.detailslist = temp.reduce(function (r: any[], o: { coursename: any; totalmarks: any; obtainedMarks: any; status: any; startDate: any; endDate: any; }) {
            var key = o.coursename;
            if (!helper[key]) {

              helper[key] = Object.assign({}, o); // create a copy of o

              r.push(helper[key]);

            } else {

              helper[key].totalmarks += o.totalmarks;

              helper[key].obtainedMarks += o.obtainedMarks;
              helper[key].e_Date = o.coursename;
              helper[key].e_Date = o.status;
              helper[key].e_Date = o.startDate;
              helper[key].e_Date = o.endDate;
            }
            return r;

          }, []);
          // this.detailslist = this.reduceData(temp);

        }

        else {
          let temp: any = data;
          var helper: any = {}
          this.detailslist = temp.reduce(function (r: any[], o: { coursename: any; totalmarks: any; obtainedMarks: any; status: any; startDate: any; endDate: any; }) {
            var key = o.coursename;
            if (!helper[key]) {

              helper[key] = Object.assign({}, o); // create a copy of o

              r.push(helper[key]);

            } else {

              helper[key].totalmarks += o.totalmarks;

              helper[key].obtainedMarks += o.obtainedMarks;
              helper[key].e_Date = o.coursename;
              helper[key].e_Date = o.status;
              helper[key].e_Date = o.startDate;
              helper[key].e_Date = o.endDate;
            }
            return r;

          }, []);
          // this.detailslist = this.reduceData(temp);

        }

        // .filter(x => x.checked == 1);
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetTestResponsenew');
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
