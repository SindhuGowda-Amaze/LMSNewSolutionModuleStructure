import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chapter-dashboard',
  templateUrl: './chapter-dashboard.component.html',
  styleUrls: ['./chapter-dashboard.component.css']
})
export class ChapterDashboardComponent implements OnInit {

  coursedetails: any;
  search: any;

  constructor(private LearningService: LearningService) { }
  courselist: any;

  ngOnInit(): void {
    this.GetChapter();
    this.GetCourse();
  }

  public GetCourse() {
    debugger
    this.LearningService.GetCourseDropdown().subscribe(
      data => {
        debugger
        this.courselist = data;
      })
  }

  dummcoursedetails: any;
  id: any;
  courseName: any;
  name: any;
  description: any;
  chapterPhoto: any;
  chapterText: any;

  public GetChapter() {
    debugger
    this.LearningService.GetChapter().subscribe(data => {
      debugger
      this.coursedetails = data;
      this.dummcoursedetails = data;
      debugger
    })
  }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public PreviewVideo() {
    window.open('assets/Images/Java_Course.mp4')
  }

  public PreviewPPT() {
    window.open('assets/Images/JAVA_PPT.ppt')
  }

  // edit(id: any) {
  //   debugger
  //   location.href = "#/Chapter/" + id;
  // }

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
        this.LearningService.DeleteChapter(id).subscribe(
      data => {
        debugger
        this.GetChapter();
      }
    )
    Swal.fire('Successfully Deleted...!');
    this.ngOnInit();
      }
    });
  }

  Attachmentlist: any;

  ShowAttachments(id: any) {
    debugger
    this.LearningService.GetChapterAttachmentByChapterID(id).subscribe(data => {
      debugger
      this.Attachmentlist = data;
    })
  }

  openAttchments(photo: any) {
    window.open(photo, "_blank")
  }
  courseid: any;

  getcourseid(even: any) {
    this.courseid = even.target.value;
    if (even.target.value != 0) {
      this.coursedetails = this.dummcoursedetails.filter((x: { courseID: any; }) => x.courseID == this.courseid)
    }
    else{
      this.GetChapter();
    }
  }

  photo:any;
  Showimage(chapterPhoto:any){
    this.photo=chapterPhoto;

  }

  view(desc:any){
    this.description=desc;
    
  }



}
