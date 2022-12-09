import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-learning-history',
  templateUrl: './learning-history.component.html',
  styleUrls: ['./learning-history.component.css']
})
export class LearningHistoryComponent implements OnInit {

  joblist: any;
  search: any;
  count: any;
  staffid: any;
  manager: any;
  trainer: any;
  courselist: any;
  Checkid: any;
  roleid: any;
  courseID: any;
  result: any;
  dummemployeedetails: any;
  detailslist: any;
  Staff: any;
  Course: any;
  empid: any;
  MarksObtained: any;
  TotalMarks: any;
  currentUrl: any;
  todaydate: any;
  constructor(public LearningService: LearningService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.getdetailslist();
    // this.show = 2;
    this.roleid = sessionStorage.getItem('roleid');
    this.staffid = sessionStorage.getItem('userid');
    this.manager = sessionStorage.getItem('manager');
    this.trainer = sessionStorage.getItem('trainerid');
    if (this.trainer == undefined) {
      this.Checkid = 0;
    } else {
      this.Checkid = 1;
    }

    this.GetMyDetails();
  }

  GetMyDetails() {
    this.LearningService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        // this.result = data.filter(x => x.manager == this.manager );
        this.result = data.filter(
          (x) => x.supervisor == sessionStorage.getItem('userid')
        );
      },
      error: (err: { error: { message: any } }) => {
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

  public GetEnroll() {
    debugger;
    this.LearningService.GetEnroll().subscribe({
      next: (data) => {
        debugger;
        // this.result = data.filter(x => x.manager == this.manager );
        this.result = data;
        this.dummemployeedetails = data;
        this.count = this.result.length;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetEnroll');
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









  // const { staffname, startDate, endDate, coursename, totalmarks, obtainedMarks, status } = cur;                            // Get name and value from current item
  // const item = acc.find((it: { coursename: any; }) => it.coursename === coursename);        // Find in our accumulator the desired object
  // item ? item.totalmarks += totalmarks : acc.push({ coursename, totalmarks });
  // item ? item.obtainedMarks += obtainedMarks : acc.push({ coursename, obtainedMarks });
  // item ? item.staffname : acc.push({ coursename, staffname });
  // acc.push({ coursename, staffname });
  // acc.push({ coursename, startDate }) 
  // acc.push({ coursename, endDate })
  // acc.push({ coursename, status })
  //item ? item.obtainedMarks += obtainedMarks : acc.push({ coursename, obtainedMarks }); // Update object or create a new object if it doesn't exist
  //   return acc;                                           // Return accumulator
  // }, []);

  public getdetailslist1() {
    debugger;
    this.LearningService.GetApproveCourse(this.empid).subscribe({
      next: (data) => {
        debugger;
        this.courselist = data;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetApproveCourse');
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

  view(staffname: any, coursename: any) {
    this.Staff = staffname;
    this.Course = coursename;
  }

  Check(id: any) {
    location.href = '#/Trainer/Checkanswer/' + id;
  }

  download() {
    this.convetToPDF1();
  }
  public convetToPDF1() {
    debugger;

    var data: any = document.getElementById('downloadaplication');
    html2canvas(data)
      .then((canvas) => {
        var margin = 5;
        var imgWidth = 208;
        // var pageHeight = 295 - 10 * margin;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        var doc = new jsPDF('p', 'mm');
        var position = 0;
        while (heightLeft > 0) {
          const contentDataURL = canvas.toDataURL('image/png');
          position = heightLeft - imgHeight;

          doc.addPage();
          doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.deletePage(1);
        doc.save('ER-2 Report.pdf');

        var pdf1 = doc.output('blob');
        var file = new File([pdf1], 'Application.pdf');
        let body = new FormData();
        debugger;
        body.append('Dan', file);
        console.log('pdf', pdf1);
      })
      .then(() => { });
  }

  fileName = 'Employee Assessment Result Reports.xlsx';
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

}
