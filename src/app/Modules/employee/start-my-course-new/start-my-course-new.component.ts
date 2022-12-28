import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-start-my-course-new',
  templateUrl: './start-my-course-new.component.html',
  styleUrls: ['./start-my-course-new.component.css'],
})
export class StartMyCourseNewComponent implements OnInit {
  courseid: any;
  loader: any;
  [x: string]: any;
  coursedetails: any;
  chapterdetails: any;
  coursename: any;
  chaptername: any;
  chapterdescription: any;
  chapterphoto: any;
  show: any;
  Attachmentlist: any = [];

  dummAttachmentlist: any;
  showvideo: any;
  showimage: any;
  showPdf: any;
  showDocument: any;
  showPpt: any;
  showcard: any;
  noattachments: any;
  domSanitizer: any;
  ppt: any;
  currentUrl: any;
  files1: File[] = [];
  file: any;
  Attachment: any = [];
  files: File[] = [];
  userid: any;
  UserName: any;
  constructor(
    private LearningService: LearningService,
    private ActivatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public router: Router,
  ) { }

  ngOnInit(): void {
    debugger
    this.currentUrl = window.location.href;
    this.loader = false;
    this.userid = sessionStorage.getItem('userid');
    this.UserName = sessionStorage.getItem('UserName');

    this.ActivatedRoute.params.subscribe((params) => {
      debugger;
      this.courseid = params['id'];
      this.InsertTimeSpent();
      this.GetChapter();

    });
    this.show = 1;
   
  }
 

  TraininghourseID:any;
 
  Coureseidfortime:any;
  public InsertTimeSpent(){
    debugger

    var eb = {
      'CourseID': this.courseid,
      'StaffID':  this.userid,
      // 'LogoutDate': new Date(),
      // 'EndTime': this.totalmarks,
     
    }
    this.LearningService.InsertTrainingHours(eb)
      .subscribe({
        next: data => {
          debugger
          this.TraininghourseID=data;
          localStorage.setItem('TraininghourseID',this.TraininghourseID)
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Inserting Announcements');
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













  teststatus: any
  public GetChapter() {
    this.loader = true;
    debugger;
    this.LearningService.GetChapterListByEmployeeID(
      sessionStorage.getItem('userid')
    ).subscribe({
      next: (data) => {
        debugger;
        this.coursedetails = data.filter((x) => x.courseID == this.courseid);
        // this.chapterdetails = data.filter(x=>x.ID==this.ID && x.courseID==this.courseid);
        this.chapterdetails = data.filter((x) => x.courseID == this.courseid);
        this.loader = false;
        debugger;
        this.coursename = this.coursedetails[0].courseName;
        this.chaptername = this.coursedetails[0].name;
        this.chapterdescription = this.coursedetails[0].chapterText;
        this.chapterphoto = this.coursedetails[0].chapterPhoto;
        this.teststatus = this.coursedetails[0].teststatus;

        this.ShowAttachments(this.coursedetails[0].id);
        this.show = 1;
        debugger;
        let result = this.chapterdetails.filter(
          (x: { teststatus: string }) =>
            x.teststatus == 'Failed' || x.teststatus == 'nottaken'
        );
        debugger;
        if (result.length == 0) {
          this.LearningService.UpdateCourseCompleted(
            sessionStorage.getItem('userid'),
            this.courseid
          ).subscribe((data) => { });
        }
      },
      error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetChapterListByEmployeeID');
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

    this.loader = false;
  }
  public getcoursedetails(details: any) {
    this.coursename = details.courseName;
    this.chaptername = details.name;
    this.chapterdescription = details.chapterText;
    this.chapterphoto = details.chapterPhoto;
    this.ShowAttachments(details.id);
    this.show = 1;
  }

  clickcard() {
    this.showcard = 1;
  }

  ShowAttachments(id: any) {
    debugger;
    this.showvideo = 0;
    this.showimage = 0;
    this.showPdf = 0;
    this.showDocument = 0;
    this.showPpt = 0;

    this.LearningService.GetChapterAttachmentByChapterID(id).subscribe({
      next: (data) => {
        debugger;
        this.Attachmentlist = data;
        this.dummAttachmentlist = data;
        if (this.dummAttachmentlist.length != 0) {
          var list = this.dummAttachmentlist.filter(
            (x: { attachmentType: string }) => x.attachmentType == 'video'
          );
          var list1 = this.dummAttachmentlist.filter(
            (x: { attachmentType: string }) => x.attachmentType == 'Pdf'
          );
          var list2 = this.dummAttachmentlist.filter(
            (x: { attachmentType: string }) => x.attachmentType == 'Image'
          );
          var list3 = this.dummAttachmentlist.filter(
            (x: { attachmentType: string }) => x.attachmentType == 'Document'
          );
          var list4 = this.dummAttachmentlist.filter(
            (x: { attachmentType: string }) => x.attachmentType == 'Ppt'
          );
          if (list.length != 0) {
            this.showvideo = 1;
          }
          if (list1.length != 0) {
            this.showPdf = 1;
          }
          if (list2.length != 0) {
            this.showimage = 1;
          }
          if (list3.length != 0) {
            this.showDocument = 1;
          }
          if (list4.length != 0) {
            this.showPpt = 1;
          }
        }
      },
      error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetChapterAttachmentByChapterID');
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

  public PreviewVideo(photo: any) {
    debugger;
    this.show = 2;
    // this.chapterphoto = photo;
    window.open(photo, '_blank');
    if (this.Attachmentlist.length != 0) {
      this.Attachmentlist = this.dummAttachmentlist.filter(
        (x: { attachmentType: string }) => x.attachmentType == 'video'
      );
      if (this.Attachmentlist.length != 0) {
        // this.show = 2
      } else {
        this.noattachments = 'No Videos Found';
        this.show = 5;
      }
    } else {
      this.noattachments = 'No Videos Found';
      this.show = 5;
    }
    location.reload();
  }

  public PreviewPdf(photo: any) {
    this.show = 3;
    //  this.chapterphoto = this.sanitizer.bypassSecurityTrustResourceUrl(photo);
    window.open(photo, '_blank');
    if (this.Attachmentlist.length != 0) {
      this.Attachmentlist = this.dummAttachmentlist.filter(
        (x: { attachmentType: string }) => x.attachmentType == 'Pdf'
      );
      if (this.Attachmentlist.length != 0) {
        //  this.show=3
        window.open(this.Attachmentlist[0].photo, '_blank');
      } else {
        this.noattachments = 'No Pdf Available';
        this.show = 5;
      }
    } else {
      this.noattachments = 'No Pdf Available';
      this.show = 5;
    }
    location.reload();
  }

  public PreviewPPT(photo: any) {
    this.show = 4;
    //  this.chapterphoto = "https://docs.google.com/gvie" + photo;
    window.open(photo, '_blank');
    this.ppt = this.sanitizer.bypassSecurityTrustResourceUrl(photo);
    window.open(photo, '_blank');
    if (this.Attachmentlist.length != 0) {
      this.Attachmentlist = this.dummAttachmentlist.filter(
        (x: { attachmentType: string }) => x.attachmentType == 'Ppt'
      );
      if (this.Attachmentlist.length != 0) {
        //  this.show=3
      } else {
        this.noattachments = 'No Ppt Available';
        this.show = 5;
      }
    } else {
      this.noattachments = 'No Ppt Available';
      this.show = 5;
    }
    location.reload();
  }

  public PreviewMSword(photo: any) {
    debugger;
    this.show = 5;
    //  this.chapterphoto = this.sanitizer.bypassSecurityTrustResourceUrl(photo);
    this.show = 4;
    this.chapterphoto = photo;
    this.chapterphoto = this.sanitizer.bypassSecurityTrustResourceUrl(photo);
    window.open(photo, '_blank');
    if (this.Attachmentlist.length != 0) {
      this.Attachmentlist = this.dummAttachmentlist.filter(
        (x: { attachmentType: string }) => x.attachmentType == 'Document'
      );
      if (this.Attachmentlist.length != 0) {
      } else {
        this.noattachments = 'No Document Available';
        this.show = 5;
      }
    } else {
      this.noattachments = 'No Document Available';
      this.show = 5;
    }
    location.reload();
  }

  public PreviewIMG(photo: any) {
    this.show = 1;
    //  this.chapterphoto = photo;
    window.open(photo, '_blank');
    // this.ActivatedRoute.
    if (this.Attachmentlist.length != 0) {
      debugger;
      this.Attachmentlist = this.dummAttachmentlist.filter(
        (x: { attachmentType: string }) => x.attachmentType == 'Image'
      );
      if (this.Attachmentlist.length != 0) {
        this.show = 4;
        debugger;
      } else {
        this.noattachments = 'No Image Available';
        this.show = 5;
      }
      location.reload();
    } else {
      this.noattachments = 'No Image Available';
      this.show = 5;
    }
    location.reload();
  }

  certificate() {


    location.href = '#/CourseCertificate/' + this.courseid;
  }


  onSelect(event: any) {
    this.files1.length = 0;
    this.files1 = [];
    console.log(event);
    this.files1.push(...event.addedFiles);
    this.uploadattachments1();
  }

  onRemove(event: any) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  public uploadattachments1() {
    debugger;
    this.LearningService.AttachmentsUpload(this.files1).subscribe({
      next: (data) => {
        debugger;
        this.file = data;
        this.Attachment.push(this.file);
        console.log('Attchaments', this.Attachment);
        Swal.fire('Attachment Uploaded');
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting AttachmentsUpload');
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
  ChapterID: any
  getid(id: any) {
    this.ChapterID = id
  }

  Add() {
    // for (let i = 0; i < this.Attachment.length; i++) {
    //   var entity = {
    //     ChapterID: this.id,
    //     ChapterAttachmentUrl: this.Attachment[i],
    //   };
    //   this.LearningService.InsertChapterAttachment(entity).subscribe({
    //     next: (data) => {
    //       debugger;
    //       Swal.fire('Content Added Successfully...!');
    //       this.Attachment.length = 0;
    //       this.files1.length = 0;
    //       this.files1 = [];
    //     },
    //     error: (err: { error: { message: any } }) => {
    //       Swal.fire('Issue in InsertChapterAttachment');
    //       // Insert error in Db Here//
    //       var obj = {
    //         PageName: this.currentUrl,
    //         ErrorMessage: err.error.message,
    //       };
    //       this.LearningService.InsertExceptionLogs(obj).subscribe((data) => {
    //         debugger;
    //       });
    //     },
    //   });
    // }
    Swal.fire('Content Added Successfully...!');
  }





  questionList: any;
  public save() {
    debugger
    Swal.fire({
      title: 'Are you sure Want to Submit?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit it!'
    }).then((result) => {
      if (result.isConfirmed) {
        var Entityy = {
          'Attachment': this.Attachment[0],
          'StaffID': this.userid,
          'CourseID': this.courseid,
          'ChapterID': this.ChapterID
        }
        this.LearningService.InsertClassRoomAssessmentDocument(Entityy)
          .subscribe({
            next: data => {
              // debugger
              // this.testResponseID = data;
              // if (this.testResponseID == 10) {
              //   Swal.fire('You Already took this Test');
              //   this.ngOnInit();
              // }
            }
            , error: (err: { error: { message: any; }; }) => {
              Swal.fire('Issue in Getting Expenses List Web');
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
        Swal.fire(
          'Submitted!',
          'Saved Sucessfully.',
          'success'
        )
        location.href = "#/Employee/StartMyCourseNew";
      }
    })
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
}


