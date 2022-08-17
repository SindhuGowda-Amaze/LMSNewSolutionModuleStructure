import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-employee-assessment-result',
  templateUrl: './employee-assessment-result.component.html',
  styleUrls: ['./employee-assessment-result.component.css'],
})
export class EmployeeAssessmentResultComponent implements OnInit {
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

  constructor(public LearningService: LearningService) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
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
          this.detailslist = data.filter((x) => x.trainerID == this.staffid);
        } else {
          this.detailslist = data;
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
    location.href = '/Trainer/Checkanswer/' + id;
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
      .then(() => {});
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
