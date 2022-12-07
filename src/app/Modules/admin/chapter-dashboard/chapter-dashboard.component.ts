import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chapter-dashboard',
  templateUrl: './chapter-dashboard.component.html',
  styleUrls: ['./chapter-dashboard.component.css'],
})
export class ChapterDashboardComponent implements OnInit {
  coursedetails: any;
  search: any;
  courselist: any;
  dummcoursedetails: any;
  id: any;
  courseName: any;
  name: any;
  description: any;
  chapterPhoto: any;
  chapterText: any;
  files: File[] = [];
  currentUrl: any;
  Attachmentlist: any;
  TrainingType: any;
  constructor(private LearningService: LearningService) { }

  ngOnInit(): void {

    this.TrainingType="0"
    this.currentUrl = window.location.href;
    this.GetChapter();
    this.GetCourse();
  }

  public GetCourse() {
    debugger;
    this.LearningService.GetCourseDropdown().subscribe({
      next: (data) => {
        debugger;
        this.courselist = data;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetCourseDropdown');
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

  public GetChapter() {
    debugger;
    this.LearningService.GetChapter().subscribe({
      next: (data) => {
        debugger;
        this.coursedetails = data.filter(x=>x.trainingType==1);
        this.dummcoursedetails = data;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting Expenses List Web');
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

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public PreviewVideo() {
    window.open('assets/Images/Java_Course.mp4');
  }

  public PreviewPPT() {
    window.open('assets/Images/JAVA_PPT.ppt');
  }

  // edit(id: any) {
  //   debugger
  //   location.href = "#/Chapter/" + id;
  // }

  public Ondelete(id: any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: 'Do you want to delete the Selected Record',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value == true) {
        this.LearningService.DeleteChapter(id).subscribe((data) => {
          debugger;
          this.GetChapter();
        });
        Swal.fire('Successfully Deleted...!');
        this.ngOnInit();
      }
    });
  }

  ShowAttachments(id: any) {
    debugger;
    this.LearningService.GetChapterAttachmentByChapterID(id).subscribe({
      next: (data) => {
        debugger;
        this.Attachmentlist = data;
      },
      error: (err: { error: { message: any } }) => {
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

  openAttchments(photo: any) {
    window.open(photo, '_blank');
  }
  courseid: any;

  getcourseid(even: any) {
    this.courseid = even.target.value;
    if (even.target.value != 0) {
      this.coursedetails = this.dummcoursedetails.filter(
        (x: { courseID: any }) => x.courseID == this.courseid
      );
    } else {
      this.GetChapter();
    }
  }

  photo: any;
  Showimage(chapterPhoto: any) {
    this.photo = chapterPhoto;
  }

  view(desc: any) {
    this.description = desc;
  }

  public getTrainingType() {
    if (this.TrainingType=='Class Room') {
      this.LearningService.GetChapter().subscribe({
        next: (data) => {
          debugger;
          this.coursedetails = data.filter(x=>x.trainingType==3);
          this.dummcoursedetails = data;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in Getting Expenses List Web');
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
    if (this.TrainingType=='External') {
      this.LearningService.GetChapter().subscribe({
        next: (data) => {
          debugger;
          this.coursedetails = data.filter(x=>x.trainingType==2);
          this.dummcoursedetails = data;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in Getting Expenses List Web');
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
    if (this.TrainingType == 'Online') {
      this.LearningService.GetChapter().subscribe({
        next: (data) => {
          debugger;
          this.coursedetails = data.filter(x=>x.trainingType==1);
          this.dummcoursedetails = data;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in Getting Expenses List Web');
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
  }
}
