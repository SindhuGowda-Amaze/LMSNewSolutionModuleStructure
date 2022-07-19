import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-course-certificate',
  templateUrl: './course-certificate.component.html',
  styleUrls: ['./course-certificate.component.css']
})
export class CourseCertificateComponent implements OnInit {

  courseid:any;
  constructor(public LearningService: LearningService,private ActivatedRoute:ActivatedRoute) { }
  UserName: any;
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.courseid = params['id'];
      this. GetEnrollCourseCertificate(sessionStorage.getItem('userid'))
    }
    )     
    debugger
    this.UserName = sessionStorage.getItem('UserName');
    this.getmycertiifcate();
  }


  mycertificates: any
  public getmycertiifcate() {
    debugger
    this.LearningService.GetCertification().subscribe(
      data => {
        debugger
        this.mycertificates = data.filter(x => x.employeeID == sessionStorage.getItem('userid'));
      })
  }
  public convetToPDF1() {
    debugger

    var data: any = document.getElementById('downloadaplication');
    html2canvas(data).then(canvas => {
      debugger
      var margin = 5;
      var imgWidth = 208
      // var pageHeight = 295 - 10 * margin;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft > 0) {

        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;

        doc.addPage();


        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;

      }
      doc.deletePage(1)
      doc.save('Course Completion Certificate.pdf');

      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "Application.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)
    }).then(() => {

    });;
  }

  certificate:any;
  public GetEnrollCourseCertificate(StaffID:any) {
    debugger
    this.LearningService.GetEnrollCourseCertificate(StaffID).subscribe(
      data => {
        debugger
        this.certificate = data.filter(x => x.courseID ==this.courseid);
      })
  }










}
