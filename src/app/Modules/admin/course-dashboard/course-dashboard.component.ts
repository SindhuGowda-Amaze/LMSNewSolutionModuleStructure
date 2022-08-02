import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css']
})
export class CourseDashboardComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }
  result: any;
  id:any;
  categoryName:any;
  search:any;
  result1:any;
  count:any;
  courseid:any;
  categoryid:any;
  dummresult:any;
  currentUrl:any;
  coursedetails:any;
  files: File[] = [];
  categorylist:any;
  description:any;
  dummcoursedetails:any;
  image:any;
  categorydetails:any;
  
  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.GetCourse() ;
    this.GetCategoryMaster();

  }

  public GetCourse() {
    debugger
    this.LearningService.GetCourse()
    
    .subscribe({
      next: data => {
        debugger
        this.result = data;
        this.dummresult = data;
        this.count = this.result.length;
      },error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetCourse');
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

  public GetCategoryMaster() {
    debugger
    this.LearningService.GetCategoryMaster()
    
    .subscribe({
      next: data => {
        debugger
        debugger
        this.result1 = data;
        this.categorylist=data;
        this.categorydetails=data;
      },error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetCategoryMaster');
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



  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  Update(id:any){
    
        location.href="/Admin/Course/"+id;
  }
  public GetChapter() {
    debugger
    this.LearningService.GetChapter()
    .subscribe({
      next: data => {
        debugger
        this.coursedetails = data;
        this.dummcoursedetails = data;
      },error: (err: { error: { message: any; }; }) => {
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
    

  }

  public Ondelete(id:any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: "Do you want to delete the Selected Record",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value == true) {
        this.LearningService.DeleteCourse(id)
        
        .subscribe({
          next: data => {
            debugger
        this.GetCourse();
          },
          error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in DeleteCourse');
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
        
 
    Swal.fire('Successfully Deleted...!');
    this.ngOnInit();
      }
    });
  }


  getcourseid(even: any) {
    this.courseid = even.target.value;
    if (even.target.value != 0) {
      this.coursedetails = this.dummcoursedetails.filter((x: { courseID: any; }) => x.courseID == this.courseid)
      
    }
    else{
      this.GetCourse();
    }
  }

  getcategoryid(even:any){
    debugger
    this.categoryid=even.target.value;
    if(even.target.value !=0){
      this.result = this.dummresult.filter((x: { categoryID: any; }) => x.categoryID == this.categoryid)
      this.count = this.result.length;
    }
    else{
      this.GetCourse();
    }
  }

  
  clickonimage(photo:any){
   this.image=photo;
  }
 


  view(desc:any){
    this.description=desc;
    
  }
  






}
