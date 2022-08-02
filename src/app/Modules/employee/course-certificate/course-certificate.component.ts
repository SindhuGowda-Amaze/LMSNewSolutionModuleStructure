import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-certificate',
  templateUrl: './course-certificate.component.html',
  styleUrls: ['./course-certificate.component.css'],
})
export class CourseCertificateComponent implements OnInit {
  courseid: any;
  UserName: any;
  mycertificates: any;
  certificate: any;
  currentUrl: any;

  constructor(
    public LearningService: LearningService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;

    this.ActivatedRoute.params.subscribe((params) => {
      debugger;
      this.courseid = params['id'];
      this.GetEnrollCourseCertificate(sessionStorage.getItem('userid'));
    });

    debugger;
    this.UserName = sessionStorage.getItem('UserName');
    this.getmycertiifcate();
  }

  public getmycertiifcate() {
    debugger;
    this.LearningService.GetCertification().subscribe({
      next: (data) => {
        debugger;
        this.mycertificates = data.filter(
          (x) => x.employeeID == sessionStorage.getItem('userid')
        );
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetCertification');
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
  public convetToPDF1() {
    debugger;

    var data: any = document.getElementById('downloadaplication');
    html2canvas(data)
      .then((canvas) => {
        debugger;
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
        doc.save('Course Completion Certificate.pdf');

        var pdf1 = doc.output('blob');
        var file = new File([pdf1], 'Application.pdf');
        let body = new FormData();
        debugger;
        body.append('Dan', file);
        console.log('pdf', pdf1);
      })
      .then(() => {});
  }

  public GetEnrollCourseCertificate(StaffID: any) {
    debugger;
    this.LearningService.GetEnrollCourseCertificate(StaffID)
    .subscribe({
      next: (data) => {
        debugger;
        this.certificate = data.filter((x) => x.courseID == this.courseid);
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetEnrollCourseCertificate');
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
