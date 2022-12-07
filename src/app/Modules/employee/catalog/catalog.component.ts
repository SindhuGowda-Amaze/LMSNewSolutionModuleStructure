import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  clientlist: any;
  clientlist1: any;
  count: any;
  clientstafflist: any;
  clientstafflist1: any;
  count1: any;
  Vendorlist: any;
  Vendorlist1: any;
  count2: any;
  CompanyStaffList: any;
  CompanyStaffList1: any;
  count3: any;
  vendorstafflist: any;
  vendorstafflist1: any;
  count4: any;
  courseid: any;
  stafflist: any;
  search: any;
  showfullcards: any;
  categorylist: any;
  userid: any;
  manager: any;
  Emplist: any;
  manageremail: any;
  managlist: any;
  emplyphn: any;
  courselist: any;
  categorylist1: any;
  categorylist2: any;
  categorylist3: any;
  categorylist4: any;
  show: any;
  show1: any;
  show2: any;
  show3: any;
  show4: any;
  show5: any;
  course1: any;
  course2: any;
  course3: any;
  course4: any;
  course: any;
  name: any;
  mobile: any;
  emailID: any;
  loader: any;
  currentUrl: any;
  maxdate:any;
  constructor(
    private LearningService: LearningService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.maxdate = new Date();
    debugger;
    this.userid = sessionStorage.getItem('userid');
    this.GetCourse();
    this.show1 = 1;
    this.GetCategoryMaster();
    this.manager = sessionStorage.getItem('manager');
    this.GetMyDetails();
    // this.showfullcards=1;
    this.show1 = 1;
    // this.show2 = 1;
    // this.show3 = 1;
    //  this.show = 0;
  }

  public GetMyDetails(){

    this.LearningService.GetMyDetails()
    .subscribe({
      next: data => {
        debugger;
        this.stafflist = data.filter((x) => x.id == this.userid);
        this.managlist = data.filter((x) => x.id == this.manager);
        this.manageremail = this.managlist[0].emailID;
        this.Emplist = data.filter((x) => x.id == this.userid);
        this.emplyphn = this.Emplist[0].phoneNo;
      },error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetMyDetails');
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



  public getcoureid(id: any) {
    this.courseid = id;
  }

  enroll(name: any, mobile: any, emailID: any) {
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
          manager: this.manager,
          courseid: this.courseid,
          status: 'Manager Pending',
          employeeName: name,
          phoneNo: mobile,
          email: emailID,
          type: 'Request to Manager',
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

  // showcards(){
  //  debugger
  //  this.showfullcards=0;
  // }
  showcards1(value: any) {
    debugger;
    this.show1 = value;
  }
  showcards2(value: any) {
    debugger;
    this.show2 = value;
  }
  showcards3(value: any) {
    debugger;
    this.show3 = value;
  }

  //  Showcards1(value:any){
  //   this.show1=value;
  //  }
  //  Showcards2(value:any){
  //   this.show2=value;
  //  }
  //  Showcards3(value:any){
  //   this.show3=value;
  //  }

  // showcards(id)
  // {
  //   this.courselist=this.courselist.filter(x=>x.)
  // }

  public GetCategoryMaster() {
    debugger;
    this.LearningService.GetCategoryMaster()
    .subscribe({
      next: (data) => {
        debugger;

        this.categorylist = data;
        console.log('categorylist', this.categorylist);
        // .slice(0, 1);
        // this.categorylist1 = data.slice(1, 2);
        // this.categorylist2 = data.slice(2, 3);
        // this.categorylist3 = data.slice(3, 4);
        // this.categorylist4 = data.slice(4, 5);
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetCategoryMaster');
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

  public GetCourse() {
    debugger;
    this.LearningService.GetCoursesByUserID(this.userid)
    .subscribe({
      next: (data) => {
        debugger;
        let temp=data
        if(temp[0].trainingType==3){
          this.courselist = data.filter(x=>x.startDate>this.maxdate);
          this.count = this.courselist.length;
        }
        else{
          this.courselist = data;
          this.count = this.courselist.length;
        }
       
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

    this.show1 = 1;
  }

  // public resetcourse(name:any){
  //   name.reset();
  // }

  public uncheck() {
    debugger;
    this.GetCourse();
    for (let i = 0; i < this.categorylist.length; i++) {
      debugger;
      this.categorylist[i]['checked'] = false;
    }
  }

  public filtercourse(value: any) {
    debugger;
    this.LearningService.GetCoursesByUserID(this.userid)
    .subscribe({
      next: (data) => {
        debugger;
        this.courselist = data.filter((x) => x.categoryID == value);
        console.log(this.courselist);
        this.count = this.courselist.length;
        for (let i = 0; i < this.categorylist.length; i++) {
          if (this.categorylist[i].id == value) {
            debugger;
          } else {
            this.categorylist[i]['checked'] = false;
          }
        }
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
    this.show1 = 1;

    // if(value==1)
    // {
    //   if (this.course1 == true) {

    //   }
    //   else {
    //     this.GetCourse();
    //   }
    // }
    // else if(value==2)
    // {
    //   if (this.course == true) {
    //     this.LearningService.GetCoursesByUserID(this.userid).subscribe(
    //       data => {
    //         debugger
    //         this.courselist = data.filter(x => x.categoryName == name);
    //       })
    //     this.show1 = 1;
    //   }
    //   else {
    //     this.GetCourse();
    //   }
    // }
    // else if(value==3)
    // {
    //   if (this.course2 == true) {
    //     this.LearningService.GetCoursesByUserID(this.userid).subscribe(
    //       data => {
    //         debugger
    //         this.courselist = data.filter(x => x.categoryName == name);
    //       })
    //     this.show1 = 1;
    //   }
    //   else {
    //     this.GetCourse();
    //   }
    // }
    // else if(value==4)
    // {
    //   if (this.course3 == true) {
    //     this.LearningService.GetCoursesByUserID(this.userid).subscribe(
    //       data => {
    //         debugger
    //         this.courselist = data.filter(x => x.categoryName == name);
    //       })
    //     this.show1 = 1;
    //   }
    //   else {
    //     this.GetCourse();
    //   }
    // }
    // else if(value==5)
    // {
    //   if (this.course4 == true) {
    //     this.LearningService.GetCoursesByUserID(this.userid).subscribe(
    //       data => {
    //         debugger
    //         this.courselist = data.filter(x => x.categoryName == name);
    //       })
    //     this.show1 = 1;
    //   }
    //   else {
    //     this.GetCourse();
    //   }
    // }
  }
}
function Save() {
  throw new Error('Function not implemented.');
}
