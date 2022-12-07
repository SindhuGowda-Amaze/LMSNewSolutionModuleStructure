import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
  sanitizer: any;
  chapterphoto: any;
  Attachmentlist: any;
  dummAttachmentlist: any;
  showvideo: any;
  showimage: any;
  showPdf: any;
  showDocument: any;
  showPpt: any;
  show: any;
  noattachments: any;
  loader:any;
  managlist:any;
  manageremail:any;
  Emplist:any;
  emplyphn:any;
  courseid: any;
  userid:any;
  manager:any;
  stafflist:any;
  count: any;
  currentUrl:any;
  attachmentId:any;
  domSanitizer: any;
  ppt: any;
  coursedetails: any;
  course:any
  name:any;
  mobile:any;
  emailID:any;
  rowno: any;
  showchapter:any;
  chapterdetails: any;

  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }

  ngOnInit(): void {

    
 this.currentUrl = window.location.href;

    this.loader=false
    this.userid = sessionStorage.getItem('userid')
    this.manager = sessionStorage.getItem('manager')
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.courseid = params['id'];
      this.GetTrainerCourseMapping();
      this.GetChapter()
    
      this.show = 1
    })

    this.GetMyDetails();

  }
  // enroll() {
  //   Swal.fire({
  //     title: 'Enroll Confirmation',
  //     text: "Please click on OK to send Course Enrolment Request",
  //     icon: 'warning',
  //     // icon: 'success',
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'OK'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(
  //         'Request Sent',
  //         'Your request has been sent to manager for Approval',
  //         'success'
  //       )
  //     }
  //   })
  // }

 public GetMyDetails(){


   
  this.LearningService.GetMyDetails()
  .subscribe({
    next: data => {
      debugger
      this.stafflist = data.filter(x => x.id == this.userid);
      this.managlist = data.filter(x=>x.id==this.manager)    
      this.manageremail=this.managlist[0].emailID
      this.Emplist = data.filter(x=>x.id==this.userid)
      this.emplyphn = this.Emplist[0].phoneNo
    },  error: (err: { error: { message: any; }; })=> {
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
  }



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

  // public PreviewPdf() {
  //   // window.open('assets/Images/JAVA-Stack-Brochure.pdf', "blank")
  //    window.open('assets/Images/JAVA-Stack-Brochure.pdf', "_blank")
  // }

  // public Previewvideo(vedioUrl:any) {
    
  //   window.open(vedioUrl, "_blank")
  // }

  ShowAttachments(id: any) {
    debugger
    this.showvideo = 0;
    this.showimage = 0;
    this.showPdf = 0;
    this.showDocument = 0;
    this.showPpt = 0;
    this.attachmentId =id;

    this.LearningService.GetChapterAttachmentByChapterID(id)
    
    .subscribe({
      next: data => {
        debugger
      this.Attachmentlist = data;
      this.dummAttachmentlist = data;
      this.show = 1
      if (this.dummAttachmentlist.length != 0) {
        var list = this.dummAttachmentlist.filter((x: { attachmentType: string; }) => x.attachmentType == 'video')
        var list1 = this.dummAttachmentlist.filter((x: { attachmentType: string; }) => x.attachmentType == 'Pdf')
        var list2 = this.dummAttachmentlist.filter((x: { attachmentType: string; }) => x.attachmentType == 'Image')
        var list3 = this.dummAttachmentlist.filter((x: { attachmentType: string; }) => x.attachmentType == 'Document')
        var list4 = this.dummAttachmentlist.filter((x: { attachmentType: string; }) => x.attachmentType == 'Ppt')
        if (list.length != 0) {
          this.showvideo = 1
        }
        if (list1.length != 0) {
          this.showPdf = 1
        }
        if (list2.length != 0) {
          this.showimage = 1
        }
        if (list3.length != 0) {
          this.showDocument = 1
        }
        if (list4.length != 0) {
          this.showPpt = 1
        }
      }
      },  error: (err: { error: { message: any; }; })=> {
        Swal.fire('Issue in GetChapterAttachmentByChapterID');
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



  public PreviewVideo(photo: any) {
    debugger
    this.show = 2;
   // this.chapterphoto = photo;
   window.open(photo, "_blank")
       if (this.Attachmentlist.length != 0) {
      this.Attachmentlist = this.dummAttachmentlist.filter((x: { attachmentType: string; }) => x.attachmentType == 'video')
      if (this.Attachmentlist.length != 0) {
        // this.show = 2

      }
      else {
        this.noattachments = "No Videos Found"
        this.show = 5
      }

    }
    else {
      this.noattachments = "No Videos Found"
      this.show = 5
    }
    location.reload();

  }



  public PreviewPdf(photo: any) {
    this.show = 3
  //  this.chapterphoto = this.sanitizer.bypassSecurityTrustResourceUrl(photo);
    window.open(photo, "_blank")
    if (this.Attachmentlist.length != 0) {
      this.Attachmentlist = this.dummAttachmentlist.filter((x: { attachmentType: string; }) => x.attachmentType == 'Pdf')
      if (this.Attachmentlist.length != 0) {
        //  this.show=3
        window.open(this.Attachmentlist[0].photo, "_blank")
      }
      else {
        this.noattachments = "No Pdf Available"
        this.show = 5
      }

    }
    else {
      this.noattachments = "No Pdf Available"
      this.show = 5
    }
    location.reload();
  }

  public PreviewPPT(photo: any) {
    this.show = 4;
  //  this.chapterphoto = "https://docs.google.com/gvie" + photo;
    window.open(photo, "_blank")
     this.ppt=this.sanitizer.bypassSecurityTrustResourceUrl(photo);
    window.open(photo, "_blank")
    if (this.Attachmentlist.length != 0) {
      this.Attachmentlist = this.dummAttachmentlist.filter((x: { attachmentType: string; }) => x.attachmentType == 'Ppt')
      if (this.Attachmentlist.length != 0) {
        //  this.show=3
      }
      else {
        this.noattachments = "No Ppt Available"
        this.show = 5
      }

    }
    else {
      this.noattachments = "No Ppt Available"
      this.show = 5
    }
    location.reload();
  }



  public PreviewMSword(photo: any) {
    debugger
    this.show = 5;
  //  this.chapterphoto = this.sanitizer.bypassSecurityTrustResourceUrl(photo);
     this.show=4;
    this.chapterphoto=photo;
    this.chapterphoto=this.sanitizer.bypassSecurityTrustResourceUrl(photo);
    window.open(photo, "_blank")
    if (this.Attachmentlist.length != 0) {
      this.Attachmentlist = this.dummAttachmentlist.filter((x: { attachmentType: string; }) => x.attachmentType == 'Document')
      if (this.Attachmentlist.length != 0) {
      }
      else {
        this.noattachments = "No Document Available"
        this.show = 5
      }

    }
    else {
      this.noattachments = "No Document Available"
      this.show = 5
    }
    location.reload();

  }

  public PreviewIMG(photo: any) {
    this.show = 1;
  //  this.chapterphoto = photo;
    window.open(photo, "_blank")   
    // this.ActivatedRoute.
    if (this.Attachmentlist.length != 0) {
      debugger
      this.Attachmentlist = this.dummAttachmentlist.filter((x: { attachmentType: string; }) => x.attachmentType == 'Image')
      if (this.Attachmentlist.length != 0) {
        this.show = 4
        debugger
      }
      else {
        this.noattachments = "No Image Available"
        this.show = 5
      }
      location.reload();

    }
    else {
      this.noattachments = "No Image Available"
      this.show = 5
    }
    location.reload();
  }



  public GetChapter() {
    this.loader=true
    debugger
    this.LearningService.GetChapter()
    .subscribe({
      next: data => {
        debugger
        this.chapterdetails = data.filter(x => x.courseID == this.courseid);


        
        this.count = this.chapterdetails.length;
        this.ShowAttachments(this.chapterdetails[0].id)
        this.show = 1
      },  error: (err: { error: { message: any; }; })=> {
        Swal.fire('Issue in GetChapter');
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
    

      this.loader=false
  }


  public GetTrainerCourseMapping() {
    this.loader=true
    debugger
    this.LearningService.GetTrainerCourseMapping()
    .subscribe({
      next: data => {
        debugger
        this.coursedetails = data.filter(x => x.courseID == this.courseid);
      },  error: (err: { error: { message: any; }; })=> {
        Swal.fire('Issue in GetTrainerCourseMapping');
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

    this.loader=false
  }

  GetDetails(details: any) {
    debugger
    this.rowno = details.rowno;
    this.showchapter=details.Description;
  }

  

  enroll(name:any, mobile:any,emailID:any){
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
           "courseid":this.courseid,
            "status":'Manager Pending',
            "employeeName":name,
            "phoneNo":mobile,
            "email":emailID  ,
            "type":'Request to Manager'
          };
          this.LearningService.InsertEnroll(json)
          
          .subscribe({
            next: data => {
              debugger
              let id = data;
              // Swal.fire("Saved Successfully");
            location.href="#/Catalog"
            },  error: (err: { error: { message: any; }; })=> {
              Swal.fire('Issue in InsertEnroll');
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
          'Request Sent',
          'Your request has been sent to manager for Approval',
          'success'
        );
        location.href="#/Catalog";
      }
    });
    } 

    
  public highlight(evt:any) {
    debugger
     var i, tablinks;
    //  sessionStorage.setItem("clickname",name)
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
  }








    
}

