import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainer-coures-mapping-form',
  templateUrl: './trainer-coures-mapping-form.component.html',
  styleUrls: ['./trainer-coures-mapping-form.component.css']
})
export class TrainerCouresMappingFormComponent implements OnInit {

  id: any;
  result: any;
  CourseList: any;
  BatchList: any;
  EmailID: any;
  StartDate: any;
  EndDate: any;
  BatchName: any;
  AllowedStudents: any;
  maxdate: any;
  trainerlist: any;
  currentUrl: any;
  trainerName: any;
  courseName: any;
  TrainerID: any
  CourseID: any;
  tablecount: any;
  trainingresultArray: any = [];
  Trainerdetails: any;
  TrainerName: any;
  BatchName1: any;
  result1: any;
  constructor(public LearningService: LearningService, public ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.currentUrl = window.location.href;

    this.TrainerID = 0;
    this.CourseID = 0;
    this.maxdate = new Date().toISOString().split("T")[0];
    this.GetBatch();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetTrainerCourseMapping();
      }
    })

    // this.GetTrainerCourseMappingDashboard();
    this.GetUnmappedTrainer();
    this.TrainerID = 0;
    this.CourseID = 0;

    this.BatchName = 0;
    // this.GetCourse();



    // this.ActivatedRoute.params.subscribe(params => {
    //   debugger
    //   this.id = params["id"];
    //   if (this.id != null && this.id != undefined) {
    //     this.GetCourse();
    //   }
    // })
    // this.TrainerID=0;
    // this.CourseID=0;
    // this.BatchName=0;
    //this.GetTrainerCourseMapping();
    this.GetUnmappedCourseDropdown();
  }

  public GetUnmappedCourseDropdown() {
    this.LearningService.GetUnmappedCourseDropdown()
      .subscribe({
        next: data => {
          debugger
          this.CourseList = data
        }, error: (err: { error: { message: any; }; }) => {
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

    // if(this.id==undefined || this.id==null){
    //   this.LearningService.GetUnmappedCourseDropdown()

    //   .subscribe({
    //     next: data => {
    //       debugger
    //       // this.CourseList = data.filter(x=>x.trainingType!=2);
    //       this.CourseList = data
    //     },error: (err: { error: { message: any; }; }) => {
    //       Swal.fire('Issue in GetUnmappedCourseDropdown');
    //       // Insert error in Db Here//
    //       var obj = {
    //         'PageName': this.currentUrl,
    //         'ErrorMessage': err.error.message
    //       }
    //       this.LearningService.InsertExceptionLogs(obj).subscribe(
    //         data => {
    //           debugger
    //         },
    //       )
    //     }
    //   })


    //   }
    //   else{
    //     this.LearningService.GetCourseDropdown()
    //     .subscribe({
    //       next: data => {
    //         debugger
    //         this.CourseList = data
    //       },error: (err: { error: { message: any; }; }) => {
    //         Swal.fire('Issue in Getting Expenses List Web');
    //         // Insert error in Db Here//
    //         var obj = {
    //           'PageName': this.currentUrl,
    //           'ErrorMessage': err.error.message
    //         }
    //         this.LearningService.InsertExceptionLogs(obj).subscribe(
    //           data => {
    //             debugger
    //           },
    //         )
    //       }
    //     })

    //   }

  }

  trainerliststaff: any;
  public GetUnmappedTrainer() {
    this.LearningService.GetTrainer()

      .subscribe({
        next: data => {
          debugger
          this.trainerlist = data
          // this.trainerliststaff = data.filter(x=>x.id=this.TrainerID)
          // this.TrainerName=this.trainerliststaff[0].trainerName
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in GetTrainer');
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

    // if(this.id==undefined || this.id==null){
    //   this.LearningService.GetUnmappedTrainer()
    //   .subscribe({
    //     next: data => {
    //       debugger
    //       // this.trainerlist = data.filter(x=>x.id!=this.TrainerID);
    //       this.trainerlist = data
    //     },error: (err: { error: { message: any; }; }) => {
    //       Swal.fire('Issue in GetUnmappedTrainer');
    //       // Insert error in Db Here//
    //       var obj = {
    //         'PageName': this.currentUrl,
    //         'ErrorMessage': err.error.message
    //       }
    //       this.LearningService.InsertExceptionLogs(obj).subscribe(
    //         data => {
    //           debugger
    //         },
    //       )
    //     }
    //   })

    //   }
    //   else{
    //     this.LearningService.GetTrainer()

    //     .subscribe({
    //       next: data => {
    //         debugger
    //         this.trainerlist = data
    //       },error: (err: { error: { message: any; }; }) => {
    //         Swal.fire('Issue in GetTrainer');
    //         // Insert error in Db Here//
    //         var obj = {
    //           'PageName': this.currentUrl,
    //           'ErrorMessage': err.error.message
    //         }
    //         this.LearningService.InsertExceptionLogs(obj).subscribe(
    //           data => {
    //             debugger
    //           },
    //         )
    //       }
    //     })
    //   }

  }

  public endingdatealert(even: any) {
    this.EndDate = even.target.value;
    if (this.EndDate < this.StartDate || this.EndDate < this.StartDate) {
      Swal.fire("End date should be greater than Start date")
      this.EndDate = 0
    }
  }


  GetTrainerCourseMapping() {
    this.LearningService.GetTrainerCourseMapping()

      .subscribe({
        next: data => {
          debugger
          this.result1 = data.filter((x: { id: any; }) => x.id == Number(this.id));;
          this.result = this.result1
          this.TrainerID = this.result[0].trainerID;
          this.CourseID = this.result[0].courseID;
          // this.EmailID=this.result[0].emailID;
          this.StartDate = this.result[0].startDate;
          this.EndDate = this.result[0].endDate;
          this.BatchName = this.result[0].batchID;
          this.AllowedStudents = this.result[0].noOfStudentsEnrolled;
          this.TrainerName = this.result[0].trainerName,
            this.courseName = this.result[0].courseName,
            this.BatchName1 = this.result[0].batchName
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

  }

  // Submit() {
  //   debugger
  //   if (this.TrainerID == undefined || this.CourseID == undefined || this.StartDate == undefined || this.EndDate ==
  //     undefined || this.BatchName == undefined || this.AllowedStudents == undefined) {
  //     Swal.fire("Please fill all the fields");
  //   }
  //   else {
  //     var json = {
  //       "trainerID": this.TrainerID,
  //       "courseID": this.CourseID,
  //       "startDate": this.StartDate,
  //       "endDate": this.EndDate,
  //       "batchID": this.BatchName,
  //       "noOfStudentsEnrolled": this.AllowedStudents
  //     };
  //     this.LearningService.InsertTrainerCourseMapping(json)
  //       .subscribe({
  //         next: data => {
  //           debugger
  //           let trainerlist = data;
  //           Swal.fire("Saved Successfully");
  //           location.href = "#/TrainerCourseMapping";
  //         }, error: (err: { error: { message: any; }; }) => {
  //           Swal.fire('Issue in InsertTrainerCourseMapping');
  //           // Insert error in Db Here//
  //           var obj = {
  //             'PageName': this.currentUrl,
  //             'ErrorMessage': err.error.message
  //           }
  //           this.LearningService.InsertExceptionLogs(obj).subscribe(
  //             data => {
  //               debugger
  //             },
  //           )
  //         }
  //       })
  //   }
  // }

  public SaveDetails() {
    debugger
    if (this.TrainerID == undefined || this.CourseID == undefined || this.StartDate == undefined || this.EndDate ==
      undefined || this.BatchName == undefined || this.AllowedStudents == undefined) {
      Swal.fire("Please fill all the fields");
    }
    else {
      this.LearningService.GetTrainerCourseMapping()
        .subscribe({
          next: data => {
            debugger
            let trainerlist = data.filter(x=>x.trainerID==this.TrainerID);

            // var kraname = temp[0].goalName;
            this.tablecount = 1;
            var json = {
              "trainerID": this.TrainerID,
              "courseID": this.CourseID,
              "startDate": this.StartDate,
              "endDate": this.EndDate,
              "BatchName": this.BatchName,
              "noOfStudentsEnrolled": this.AllowedStudents,
              "TrainerName": trainerlist[0].trainerName,
              "courseName": trainerlist[0].courseName,
              "BatchName1": trainerlist[0].batchName
            };
            debugger

            this.trainingresultArray.push(json);
             this.TrainerID == " ";
             this.CourseID == "";
             this.StartDate == "";
             this.EndDate == "";
             this.BatchName == "";
             this.AllowedStudents == "";
          }
        })
    }
  }

  public InsertTrainerCourseMapping () {
    debugger
    // if( this.goalSettingDate< this.todaydate ){
    //   Swal.fire('Sorry, You cannot set the goal since last date is over')
    // }
    // else{


    debugger
    for (let i = 0; i < this.trainingresultArray.length; i++) {
      if (this.trainingresultArray.length == 0) {
        Swal.fire('Please Select Training For Staff')
      }

      var entity = {
        "trainerID": this.trainingresultArray[i].trainerID,
        "courseID": this.trainingresultArray[i].courseID,
        "startDate": this.trainingresultArray[i].startDate,
        "endDate": this.trainingresultArray[i].endDate,
        "batchID": this.trainingresultArray[i].BatchName,
        "noOfStudentsEnrolled": this.trainingresultArray[i].noOfStudentsEnrolled,
      };
      this.LearningService.InsertTrainerCourseMapping(entity).subscribe(
        data => {
          debugger
          let traininglist = data;
          Swal.fire("Training Added Successfully");
          location.href = "#/TrainerCourseMapping";
          this.tablecount = 0;
          location.reload();
        })

    }
  }

  // public GetTrainerCourseMappingDashboard() {
  //   debugger
  //   this.LearningService.GetTrainerCourseMappingDashboard()
  //   .subscribe({
  //     next: data => {
  //       debugger
  //       this.Trainerdetails = data.filter((x: { id: any; }) => x.id == Number(this.id));;
  //       this.TrainerName = this.Trainerdetails[0].trainerName
  //     },error: (err: { error: { message: any; }; }) => {
  //       Swal.fire('Issue in GetTrainerCourseMappingDashboard');
  //       // Insert error in Db Here//
  //       var obj = {
  //         'PageName': this.currentUrl,
  //         'ErrorMessage': err.error.message
  //       }
  //       this.LearningService.InsertExceptionLogs(obj).subscribe(
  //         data => {
  //           debugger
  //         },
  //       )
  //     }
  //   })

  // }

  Update() {
    debugger
    var json = {
      "ID": this.id,
      "trainerID": this.TrainerID,
      "courseID": this.CourseID,
      // "emailID": this.EmailID,
      "startDate": this.StartDate,
      "endDate": this.EndDate,
      "batchID": this.BatchName,
      "noOfStudentsEnrolled": this.AllowedStudents
    };

    this.LearningService.UpdateTrainerCourseMapping(json)

      .subscribe({
        next: data => {
          debugger
          let result = data;
          Swal.fire("Successfully Updated...!");
          location.href = "#/TrainerCourseMapping";
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in UpdateTrainerCourseMapping');
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

  getCourseID(even: any) {
    debugger
    this.CourseID = even.target.value;
  }
  // public GetCourse() {
  //   debugger
  //   this.LearningService.GetCourse().subscribe(
  //     data => {
  //       debugger
  //       this.CourseList = data;
  //     })
  // }

  // BatchName:any;
  getBatchName(even: any) {
    debugger
    this.BatchName = even.target.value;
  }
  public GetBatch() {
    debugger
    this.LearningService.GetBatch()

      .subscribe({
        next: data => {
          debugger
          this.BatchList = data;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in GetBatch');
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

  getTrainerID(even: any) {
    debugger
    this.TrainerID = even.target.value;

  }




  cancel() {
    location.href = "#/Admin/TrainerCouresMapping";
  }
}
