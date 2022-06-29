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

  id:any;
  result:any;
  CourseList:any;
  BatchList:any;


  EmailID:any;
  StartDate:any;
  EndDate:any;
  BatchName:any;
  AllowedStudents:any;
  maxdate: any;
  constructor(public LearningService:LearningService, public ActivatedRoute:ActivatedRoute) { }
  trainerlist:any;
  ngOnInit(): void {
    this.TrainerID = 0;
    this.CourseID = 0;
    this.maxdate = new Date().toISOString().split("T")[0];
 

   
    this.GetBatch();
    
    // this.ActivatedRoute.params.subscribe(params => {
    //   debugger
    //   this.id = params["id"];
    //   if (this.id != null && this.id != undefined) {
    //     this.GetTrainer();
    //   }
    // })

    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetTrainerCourseMapping();
      }
    })
    this.GetTrainerCourseMapping();
    this.TrainerID=0;
    this.CourseID=0;
    
    this.BatchName=0;
    // this.GetCourse();
    if(this.id==undefined || this.id==null){
    this.LearningService.GetUnmappedCourseDropdown().subscribe(
      data => {
        debugger
        this.CourseList = data
      })
    }
    else{
      this.LearningService.GetCourseDropdown().subscribe(
        data => {
          debugger
          this.CourseList = data
        })
    }

    if(this.id==undefined || this.id==null){
      this.LearningService.GetUnmappedTrainer().subscribe(
        data => {
          debugger
          this.trainerlist = data.filter(x=>x.id!=this.TrainerID);
        })
      }
      else{
        this.LearningService.GetTrainer().subscribe(
          data => {
            debugger
            this.trainerlist = data
          })
      }
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
  }

  public endingdatealert(even: any) {
    this.EndDate= even.target.value;
    if(this.EndDate < this.StartDate || this.EndDate < this.StartDate){
      Swal.fire("End date should be greater than Start date")
      this.EndDate=0
    }
  }
  trainerName:any;
  courseName:any;

  GetTrainerCourseMapping() {
    this.LearningService.GetTrainerCourseMapping().subscribe(
    data => {
    debugger
    this.result = data;
		this.result=this.result.filter((x: { id: any; })=>x.id==Number(this.id));
    this.TrainerID=this.result[0].trainerID;
    this.CourseID=this.result[0].courseID;
		// this.EmailID=this.result[0].emailID;
		this.StartDate=this.result[0].startDate;
    this.EndDate=this.result[0].endDate;
    this.BatchName=this.result[0].batchID;
    this.AllowedStudents=this.result[0].noOfStudentsEnrolled;
      }
    ) 
  }

  Submit(){
    debugger 
    if(this.TrainerID==undefined || this.CourseID==undefined || this.StartDate==undefined || this.EndDate==
      undefined || this.BatchName==undefined || this.AllowedStudents==undefined)
    {
      Swal.fire("Please fill all the fields");
    }
  else{
    var json = {
      "trainerID":this.TrainerID,
      "courseID":this.CourseID,
       "startDate": this.StartDate,
       "endDate": this.EndDate,
       "batchID": this.BatchName,
       "noOfStudentsEnrolled": this.AllowedStudents   
    };
    this.LearningService.InsertTrainerCourseMapping(json).subscribe(
      data => {
        debugger
        let trainerlist = data;
        Swal.fire("Saved Successfully");
        location.href="#/TrainerCourseMapping";
      })
  }
  }


  Update(){
    debugger
     var json = {
      "ID": this.id,
      "trainerID":this.TrainerID,
      "courseID":this.CourseID,
      // "emailID": this.EmailID,
      "startDate": this.StartDate,
      "endDate": this.EndDate,
      "batchID": this.BatchName,
      "noOfStudentsEnrolled": this.AllowedStudents         
      };
    
      this.LearningService.UpdateTrainerCourseMapping(json).subscribe(
        data => {
        debugger
        let result = data;
        Swal.fire("Successfully Updated...!");
        location.href="#/TrainerCourseMapping";
      })
  }

  CourseID:any;
  getCourseID(even:any)
  {
    debugger
    this.CourseID=even.target.value;
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
  getBatchName(even:any)
  {
    debugger
    this.BatchName=even.target.value;
  }
  public GetBatch() {
    debugger
    this.LearningService.GetBatch().subscribe(
      data => {
        debugger
        this.BatchList = data;
      })
  }

TrainerID:any
  getTrainerID(even:any)
  {
    debugger
    this.TrainerID=even.target.value;
  }


 

  cancel() {
    location.href = "#/TrainerCourseMapping";
  }
}
