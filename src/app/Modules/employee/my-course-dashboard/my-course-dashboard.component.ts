
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-my-course-dashboard',
  templateUrl: './my-course-dashboard.component.html',
  styleUrls: ['./my-course-dashboard.component.css'],
})
export class MyCourseDashboardComponent implements OnInit {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private LearningService: LearningService,
    public router: Router,
  ) { }
  show: any;
  stafflist: any;
  userid: any;
  search: any;
  managlist: any;
  manageremail: any;
  loader: any;
  coursedetails: any;
  result: any;
  trainerCourseMapList: any;
  coursedetails1: any;
  manager: any;
  course: any;
  name: any;
  mobile: any;
  emailID: any;
  courseid: any;
  testresponse: any;
  currentUrl: any;
  profilepercentage: any;
  maxdate: any

  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  ExternalCourse: any;
  totalmarks:any;
  Percentage:any;

  ngOnInit(): void {
    const myDate = new Date();

    const locale = 'en-US';
    const format = 'yyyy-MM-dd';
    this.maxdate = formatDate(myDate, format, locale);

    this.currentUrl = window.location.href;
    this.loader = false;
    this.manager = sessionStorage.getItem('manager');
    this.userid = sessionStorage.getItem('userid');
    // this.GetTrainerCourseMapping();
    this.GetEmpcoursecounts();
    this.Showcards(2);
    this.show = 2;
    this.GetAllCounts();
    this.Showcards(2);
    this.GetMyDetails();

    // this.loader=true
    // debugger
    // this.LearningService.GetTrainerCourseMapping().subscribe(data => {
    //   debugger
    //   this.coursedetails = data;
    //   debugger
    // })
    // this.loader=false
  }

  public GetMyDetails() {
    this.LearningService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        this.stafflist = data.filter((x) => x.id == this.userid);
        this.managlist = data.filter((x) => x.id == this.manager);
        this.manageremail = this.managlist[0].emailID;
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

  // public GetTrainerCourseMapping() {
  //   this.loader=true;
  //   debugger
  //   this.LearningService.GetTrainerCourseMapping().subscribe(
  //     data => {
  //       debugger
  //       this.result = data;
  //       this.trainerCourseMapList=data;
  //       this.loader=false;
  //     })
  // }

  // public GetTrainerCourseMapping() {
  //   this.loader=true
  //   debugger
  //   this.LearningService.GetTrainerCourseMapping().subscribe(data => {
  //     debugger
  //     this.coursedetails1 = data;
  //     debugger
  //   })
  //   this.loader=false
  // }

  public flip1(event: { currentTarget: any }) {
    debugger;
    var element = event.currentTarget;
    if (element.className === 'card1') {
      if (element.style.transform == 'rotateY(180deg)') {
        element.style.transform = 'rotateY(0deg)';
      } else {
        element.style.transform = 'rotateY(180deg)';
      }
    }
  }
  Showcards(value: any) {
    this.loader = true;
    this.show = value;
    if (value == 1) {
      this.GetApproveCourse();
    } else if (value == 2) {
      debugger;
      // this.LearningService.GetEnroll().subscribe(data => {
      //   debugger
      //   this.coursedetails = data.filter((x: { staffID: any; completed: number }) => x.completed == 0 && x.staffID == this.userid);
      // });
      this.GetApproveCourse();
    } else if (value == 3) {
      debugger;
      //  this.coursedetails = this.trainerCourseMapList.filter((x: { staffID: any; completed: number; enrollid: number; })=> x.staffID==this.userid && x.completed!=1 && x.enrollid==0);
      // this.LearningService.GetTrainerCourseMapping().subscribe({
      //   next: (data) => {
      //     debugger;
      //     this.coursedetails = data.filter(
      //       (x: { staffID: any; completed: number; enrollid: number }) =>
      //         x.completed != 1 && x.enrollid == 0
      //     );
      //   },
      //  error: (err: { error: { message: any; }; }) => {
      //     Swal.fire('Issue in GetTrainerCourseMapping');
      //     // Insert error in Db Here//
      //     var obj = {
      //       PageName: this.currentUrl,
      //       ErrorMessage: err.error.message,
      //     };
      //     this.LearningService.InsertExceptionLogs(obj).subscribe((data) => {
      //       debugger;
      //     });
      //   },
      // });

      this.LearningService.GetCoursesByUserID(this.userid)
        .subscribe({
          next: (data) => {
            debugger;
            let temp = data
            this.coursedetails = data
            // this.count = this.coursedetails.length;
            // if(temp[0].trainingType==3){
            //   this.courselist = data.filter(x=>x.cStartDate>=this.maxdate);
            //   this.count = this.courselist.length;
            // }
            // else{
            //   this.courselist = data
            //   this.count = this.courselist.length;
            //  }

          },
          error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in GetCoursesByUserID');
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
    else if (value == 4) {
      this.LearningService.GetCourse().subscribe({
        next: (data) => {
          debugger;
          this.coursedetails = data.filter(
            (x) =>
              x.completed == true && x.enrollid != 0 && x.staffID == this.userid
          );
          const key = 'id';
          this.coursedetails = [...new Map(this.coursedetails.map((item: { [x: string]: any; }) => [item[key], item])).values()];
        },
        error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in GetCourse');
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
    else if (value == 5) {
      this.GetApproveCourseFoAccept();
    }
    this.loader = false;
  }

  getcourseid(id: any) {
    this.courseid = id;
  }

  latestcoursedetails: any;
  lastassigned: any;
  public GetApproveCourse() {
    debugger;
    this.LearningService.GetApproveCourse(this.userid).subscribe({
      next: (data) => {
        debugger;
        this.coursedetails = data.filter(
          (x) => x.completed == 0 && x.enrollid != 0 && x.staffid == this.userid && x.ehidden == 0
            // && x.notStarted==1 && x.type=='Manager Assign'||
            && (x.status == 'Manager Approved' || x.status == "Manager Assign")
        );
        console.log(this.coursedetails);
        this.latestcoursedetails = data[0];
        if ((this.latestcoursedetails.length = 0)) {
          this.lastassigned = 0;
          this.show = 0;
        } else {
          this.lastassigned = 1;
          // this.show=1
        }
      },
      error: (err: { error: { message: any; }; }) => {
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

  public GetApproveCourseFoAccept() {
    debugger;
    this.LearningService.GetApproveCourse(this.userid).subscribe({
      next: (data) => {
        debugger;
        this.coursedetails = data.filter(
          (x) => x.enrollid != 0 && x.notStarted == 0 && x.completed == 0 && x.status == 'Manager Assign'
        );
        console.log(this.coursedetails);
        this.latestcoursedetails = data[0];
        if ((this.latestcoursedetails.length = 0)) {
          this.lastassigned = 0;
          this.show = 0;
        } else {
          this.lastassigned = 1;
          // this.show=1
        }
      },
      error: (err: { error: { message: any; }; }) => {
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

  GetTestResponse() {
    this.LearningService.GetTestResponse().subscribe({
      next: (data) => {
        debugger;
        this.testresponse = data;
      },
      error: (err: { error: { message: any; }; }) => {
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

  GetCourse() {
    this.LearningService.GetCourse().subscribe({
      next: (data) => {
        debugger;
        this.coursedetails = data.filter((x) => x.staffID == this.userid);
      },
      error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetCourse');
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


  courseid2:any;
  CertificatList:any;
  getcourseid2(id: any) {
    this.courseid2 = id;
    this. GetCertification();
  }

  GetCertification() {
    this.LearningService.GetCertification().subscribe({
      next: (data) => {
        debugger;
        this.CertificatList = data.filter(x=>x.employeeID==this.userid)
      },
      error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetCourse');
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



  TrainerID: any;
  enroll(name: any, mobile: any, emailID: any) {


    this.LearningService.GetTrainerCourseMapping()
      .subscribe({
        next: data => {
          debugger
          this.coursedetails = data.filter(x => x.courseID == this.courseid && x.trainingType != 2);
          if (this.coursedetails.length == 0) {
            this.TrainerID = 0
          }
          else {
            this.TrainerID = this.coursedetails[0].trainerID
          }

        }, error: (err: { error: { message: any; }; }) => {
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

    Swal.fire({
      title: 'Enroll Confirmation',
      text: 'Please click on OK to send Course Enrolment Request',
      icon: 'warning',
      // icon: 'success',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
        var json = {
          staffid: this.userid,
          courseid: this.courseid,
          status: 'Manager Pending',
          manager: this.manager,
          employeeName: name,
          phoneNo: mobile,
          email: emailID,
          type: 'Request to Manager',
          Mandatory: 0,
          PIP: 0,
          LearningPath: 1,
          toBeCompletedDate: this.maxdate,
          TrainerID: this.TrainerID
        };
        this.LearningService.InsertEnroll(json)
          .subscribe({
            next: (data) => {
              debugger;
              let id = data;
              location.href = '#/Employee/Catalog';
            },
            error: (err: { error: { message: any; }; }) => {
              Swal.fire('Issue in InsertEnroll');
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

        Swal.fire(
          'Request Sent',
          'Your request has been sent to manager for Approval',
          'success'
        );
        location.href = '#/Catalog';
      }
    });
  }

  countlist: any;
  public GetAllCounts() {
    debugger;
    this.LearningService.GetAllCounts(this.userid, 2).subscribe({
      next: (data) => {
        debugger;
        this.countlist = data[0];
      },
      error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetAllCounts');
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

  empcountlist: any;
  public GetEmpcoursecounts() {
    debugger;
    this.LearningService.GetEmpcoursecounts(this.userid).subscribe({
      next: (data) => {
        debugger;
        this.empcountlist = data[0];
      },
      error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetEmpcoursecounts');
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

  getenrollid(id: any) {
    debugger;
    this.LearningService.UpdateEmpCoursedetails(id).subscribe({
      next: (data) => {
        debugger;
        this.empcountlist = data[0];
      },
      error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in UpdateEmpCoursedetails');
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


  public gotolink() {
    this.loader = true
    this.SendMail4();
    Swal.fire('Credendials Sent through Email');
  }

  Attactments: any = [];
  public SendMail4() {
    debugger
    this.loader = true
    var entity3 = {
      // 'emailto': 'praveen@amazeinc.in',
      'emailto': 'sindhugowda.amazeinc@gmail.com',
      'emailsubject': 'External Course',
      'emailbody': 'Good day ,Your Login Credentials for External Course is as follows.  <br><br>Thanks, Ayla <br><br>',
      'attachmenturl': this.Attactments,
      'cclist': '712c6878.ayalaland.com.ph@apac.teams.ms',
      'bcclist': '712c6878.ayalaland.com.ph@apac.teams.ms',
    }

    this.LearningService.sendemailattachements(entity3).subscribe(res => {
      debugger;
      this.loader = false
      window.open('https://www.simplilearn.com/', '_blank');
      // location.href="https://www.simplilearn.com/"

    })
    // this.ngOnInit();

  }



  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    console.log(event);
    this.attachments21.push(...event.addedFiles);
    if (this.attachments21 == 0) {
      Swal.fire('Invalid Attachment Type');
    }
    else if ((event.addedFiles[0].size) > 5242880) {
      Swal.fire('Please Upload File Less than 5 MB.')
    }
    else {
      Swal.fire('Attachment Added Successfully');
    }

  }

  courseID:any;
  public getdetailsforupload(details: any) {
    this.ExternalCourse = details.name
    this.courseID=details.id
  }

  public UploadCertificate() {
    debugger
    this.loader = true;
    if (this.attachments21.length == 0) {
      Swal.fire('Please Fill All fields');
      this.loader = false;
    }
    else {
      this.LearningService.AttachmentsUpload(this.attachments21)
        .subscribe({
          next: data => {
            debugger
            this.attachmentsurl.push(data);
            this.attachments.length = 0;
            this.InsertCertificate();
            this.loader = false;
          }, error: (err) => {
            Swal.fire('Issue in Inserting Project Attachments');
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
  }


  public InsertCertificate(){
 this.loader = true;
    debugger
    if (this.attachments21 == undefined || this.attachments21 == "") {
      Swal.fire('Please Fill All fields');
      this.loader = false;
    }
    else {
      var eb = {
        'CourseID': this.courseID,
        'EmployeeID':  this.userid,
        'MarksObtained': this.Percentage,
        'TotalMarks': this.totalmarks,
        'CertificateAttachment': this.attachmentsurl[0],
       
      }
      this.LearningService.InsertCertification(eb)
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Saved Successfully.');
            this.router.navigate(['/Employee/MyCourseDashboard']);
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
  }
}

