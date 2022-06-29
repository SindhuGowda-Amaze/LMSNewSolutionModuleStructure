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
  
  coursedetails:any;
  ngOnInit(): void {
    this.GetCourse() ;
    this.GetCategoryMaster();

  }

  public GetCourse() {
    debugger
    this.LearningService.GetCourse().subscribe(
      data => {
        debugger
        this.result = data;
        this.dummresult = data;
        this.count = this.result.length;
      
      })
  }


  categorylist:any;
  public GetCategoryMaster() {
    debugger
    this.LearningService.GetCategoryMaster().subscribe(
      data => {
        debugger
        this.result1 = data;
        this.categorylist=data;
        this.categorydetails=data;
      })
  }

  files: File[] = [];

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  Update(id:any){
    
        location.href="#/Course/"+id;
  }
  public GetChapter() {
    debugger
    this.LearningService.GetChapter().subscribe(data => {
      debugger
      this.coursedetails = data;
      this.dummcoursedetails = data;
      debugger
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
        this.LearningService.DeleteCourse(id).subscribe(
      data => {
        debugger
        this.GetCourse();
      }
    )
    Swal.fire('Successfully Deleted...!');
    this.ngOnInit();
      }
    });
  }

  dummcoursedetails:any;
  getcourseid(even: any) {
    this.courseid = even.target.value;
    if (even.target.value != 0) {
      this.coursedetails = this.dummcoursedetails.filter((x: { courseID: any; }) => x.courseID == this.courseid)
      
    }
    else{
      this.GetCourse();
    }
  }


  categorydetails:any;
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

   image:any
  clickonimage(photo:any){
   this.image=photo;
  }
 

  description:any;
  view(desc:any){
    this.description=desc;
    
  }
  






}
