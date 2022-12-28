import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(public DigiofficeService: LearningService, private activatedroute: ActivatedRoute, private datepipe: DatePipe) { }
  testing: any
  testing1: any
  hi: any;
  staffname: any;
  Departmentlist: any;
  stafflist: any;
  Citylist: any;
  loader: any;
  searchchat: any;
  currentUrl: any;
  Department: any;
  City: any;
  empid: any;
  ReciverID: any;
  messsages: any;
  newmsg: any
  public activeElement: any;
  EnrollTrainerCourseMappingList:any;
  public attachments: any = [];
  roleid:any;

  ngOnInit(): void {
    debugger
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid')
    this.loader = true;
    this.City = "";
    this.Department = "";
    this.empid = sessionStorage.getItem('userid');
    // this.GetAllStaffNew();
    this.GetTrainerCourseMappingByEnroll();
    this.GetDepartment();
    this.GetCityType();
    this.GetAllStaffNewActiveParam();
    this.getchatmaster();
  }

  public GetTrainerCourseMappingByEnroll() {
if(this.roleid==2){
  this.DigiofficeService.GetTrainer()
  .subscribe({
    next: data => {
      debugger
      this.EnrollTrainerCourseMappingList = data;
      this.loader=false;
    }, error: (err) => {
      Swal.fire('Issue in Getting Subsidiary Master');
      // Insert error in Db Here//
      var obj = {
        'PageName': this.currentUrl,
        'ErrorMessage': err.error.message
      }
      this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
        data => {
          debugger
        },
      )
    }
  })
}
else if(this.roleid=4){

}
   
    }

  public GetAllStaffNewActiveParam() {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.DigiofficeService.GetAllStaffNew()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.id != localStorage.getItem('staffid'));
            this.ReciverID = params['id'];
            this.getstaffid(parseInt(this.ReciverID));
            this.loader=false;
            this.DigiofficeService.GetAllStaffNew()
              .subscribe({
                next: data => {
                  debugger
                  let temp: any = data.filter(x => x.id == this.ReciverID);
                  this.staffname = temp[0].name;
                  this.loader=false;
                }, error: (err) => {
                  Swal.fire('Issue in Getting All New Staff');
                  // Insert error in Db Here//
                  var obj = {
                    'PageName': this.currentUrl,
                    'ErrorMessage': err.error.message
                  }
                  this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                    data => {
                      debugger
                    },
                  )
                }
              })
          }, error: (err) => {
            Swal.fire('Issue in Getting All New Staff');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    })
  }

  public GetAllStaffNew() {
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.id != localStorage.getItem('staffid'));
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting All New Staffs');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public GetDepartment() {
    this.DigiofficeService.GetDepartment()
      .subscribe({
        next: data => {
          debugger
          this.Departmentlist = data;
          this.loader=false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Department');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public GetCityType() {
    this.DigiofficeService.GetCityType()
      .subscribe({
        next: data => {
          debugger
          this.Citylist = data;
          this.loader=false;
        }, error: (err) => {
          Swal.fire('Issue in Getting City Type');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public filterByDepartment() {
    debugger
    if (this.Department == "") {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.id != localStorage.getItem('staffid'));
            this.loader=false;
          }, error: (err) => {
            Swal.fire('Issue in Getting My Details');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
    else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.id != localStorage.getItem('staffid') && x.department == this.Department);
            this.loader=false;
          }, error: (err) => {
            Swal.fire('Issue in Getting My Details');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
  }

  public filterByCitylist() {
    debugger
    if (this.City == "") {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.id != localStorage.getItem('staffid'));
            this.loader=false;
          }, error: (err) => {
            Swal.fire('Issue in Getting My Details');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
    else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.id != localStorage.getItem('staffid') && x.district == this.City);
            this.loader=false;
          }, error: (err) => {
            Swal.fire('Issue in Getting My Details');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
  }

  public getchatmaster() {
    this.DigiofficeService.GetChatGroupMaster()
      .subscribe({
        next: data => {
          debugger
          this.messsages = data.filter(x => (x.senderID == this.empid && x.reciverID == this.ReciverID) || (x.senderID == this.ReciverID && x.reciverID == this.empid));
          this.loader=false;
          for (let i = 0; i < this.messsages.length; i++) {
            if (this.messsages[i].senderID == this.empid) {
              this.messsages[i].position = 'right';
              this.loader=false;
            }
            else {
              this.messsages[i].position = 'left';
              this.loader=false;
            }
          }
        }, error: (err) => {
          Swal.fire('Issue in Getting Chat Group Master');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public insertchatmaster(msgtype: any) {
    debugger
    if (this.newmsg == undefined || this.newmsg == null || this.newmsg == '') {
      Swal.fire('Please Enter message');
      this.loader=false;
    }
    else {
      var entity = {
        'SenderID': this.empid,
        'Message': this.newmsg,
        'ReciverID': this.ReciverID,
        'PhotoURL': msgtype,
        'ProjectID': 1
      }
      this.DigiofficeService.InsertGroupChatMaster(entity)
        .subscribe({
          next: data => {
            debugger
            this.InsertNotification();
            this.getchatmaster();
            this.newmsg = "";
            this.loader=false;
          }, error: (err) => {
            Swal.fire('Issue in Inserting Group Chat Master');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
  }

  public onattachmentUpload(abcd: string | any[]) {
    debugger
    this.attachments.push(abcd[0]);
    this.uploadattachments();
  }

  public InsertNotification() {
    debugger
    var entity = {
      'Date': new Date(),
      'Event': 'Chat',
      'FromUser': this.ReciverID,
      'ToUser': this.empid,
      'Message': 'You have got new Message From ' + localStorage.getItem('UserName'),
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': this.ReciverID,
      'NotificationTypeID': 18,
      'VendorID': 0
    }
    this.DigiofficeService.InsertNotification(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            this.loader=false;
          }
        }, error: (err) => {
          Swal.fire('Issue in Inserting Notification');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public uploadattachments() {
  }

  public getstaffid(item: any) {
    debugger
    this.activeElement = item;
    this.ReciverID = item;
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          let temp: any = data.filter(x => x.id == this.ReciverID);
          this.staffname = temp[0].name;
          this.loader=false;
        }, error: (err) => {
          Swal.fire('Issue in Getting All New Staff');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
    this.getchatmaster();
  }

}