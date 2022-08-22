import { Component, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-time-table-form',
  templateUrl: './time-table-form.component.html',
  styleUrls: ['./time-table-form.component.css']
})
export class TimeTableFormComponent implements OnInit {

  Course_Photo: any;
  Attachment: any[] = [];
  result: any;
  id: any;
  CourseID: any;
  courseID: any;
  Name: any;
  name: any;
  description: any;
  ChapterPhoto: any;
  chapterID: any;
  CourseName: any;
  courseName: any;
  chapterText: any;
  show: any;
  Attachmentlist: any;
  assessmentName: any;
  generalInstructions: any;
  showChapterPhoto: any;
  files1: File[] = [];
  file: any;
  courselist: any;
  files: File[] = [];
  photourl: any;
  photoid: any;
  file1: any;
  image: any;
  currentUrl: any;
  dropdownSettings: any = {};
  constructor(
    public LearningService: LearningService,
    private ActivatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.courseID = 0;
    this.GetCourse();
    this.ActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
        this.show = 1;
        this.GetChapter();
        this.GetChapterAttachmentByChapter();

        this.GetChapterAttachmentByChapterID();
      } else {
        this.show = 0;
      }
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }


  GetChapterAttachmentByChapterID() {
    this.LearningService.GetChapterAttachmentByChapterID(this.id).subscribe({
      next: (data) => {
        debugger;
        this.Attachmentlist = data;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting ChapterAttachmentByChapterID');
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
    this.LearningService.GetChapter().subscribe({
      next: (data) => {
        debugger;
        this.result = data;
        debugger;
        this.result = this.result.filter(
          (x: { id: any }) => x.id == Number(this.id)
        );
        this.courseID = this.result[0].courseID;
        this.name = this.result[0].name;
        this.description = this.result[0].description;
        this.ChapterPhoto = this.result[0].orginalChapterPhoto;
        this.showChapterPhoto = this.result[0].chapterPhoto;
        this.chapterText = this.result[0].chapterText;
        this.chapterID = this.result[0].courseID;
        (this.assessmentName = this.result[0].assesmentName),
          (this.generalInstructions = this.result[0].generalInstructions);
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetChapter');
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

  Cancel() {
    location.href = '#/Trainer/TimeTable';
  }

  onSelect1(event: any) {
    this.files1.length = 0;
    this.files1 = [];
    console.log(event);
    this.files1.push(...event.addedFiles);
    this.uploadattachments1();
  }

  onRemove1(event: any) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  public uploadattachments1() {
    debugger;
    this.LearningService.AttachmentsUpload(this.files1).subscribe({
      next: (data) => {
        debugger;
        this.file = data;
        this.Attachment.push(this.file);
        console.log('Attchaments', this.Attachment);
        Swal.fire('Attachment Uploaded');
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting AttachmentsUpload');
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

  getCourseID(even: any) {
    debugger;
    this.courseID = even.target.value;
  }

  openAttchments(photo: any) {
    window.open(photo, '_blank');
  }

  Update() {
    debugger;
    var json = {
      ID: this.id,
      courseID: this.courseID,
      Name: this.name,
      Description: this.description,
      ChapterPhoto: this.ChapterPhoto,
      ChapterText: this.chapterText,
      AssessmentName: this.assessmentName,
      GeneralInstructions: this.generalInstructions,
    };

    this.LearningService.UpdateChapter(json).subscribe({
      next: (data) => {
        debugger;
        let result = data;
        Swal.fire('Updated Successfully ...!');
        location.href = '#/Admin/ChapterDashboard';
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in UpdateChapter');
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

  Save() {
    debugger;
    if (
      this.courseID == undefined ||
      this.name == undefined ||
      this.description == undefined ||
      this.ChapterPhoto == undefined ||
      this.chapterText == undefined ||
      this.generalInstructions == undefined ||
      this.assessmentName == undefined ||
      this.assessmentName == '' ||
      this.generalInstructions == ''
    ) {
      Swal.fire('Please fill all the fields');
    } else {
      var json = {
        courseID: this.courseID,
        Name: this.name,
        Description: this.description,
        ChapterPhoto: this.ChapterPhoto,
        ChapterText: this.chapterText,
        GeneralInstructions: this.generalInstructions,
        AssessmentName: this.assessmentName,
      };
      this.LearningService.InsertChapter(json).subscribe({
        next: (data) => {
          debugger;
          this.chapterID = data;
          this.insertAttchmentFiles();
          Swal.fire('Saved Successfully');
          location.href = '#/Admin/ChapterDashboard';
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in InsertChapter');
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

  insertAttchmentFiles() {
    for (let i = 0; i < this.Attachment.length; i++) {
      var entity = {
        ChapterID: this.chapterID,
        ChapterAttachmentUrl: this.Attachment[i],
      };
      this.LearningService.InsertChapterAttachment(entity).subscribe({
        next: (data) => {
          debugger;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in InsertChapterAttachment');
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

  onSelect(event: any) {
    console.log(event);
    debugger;
    this.files.push(...event.addedFiles);
    this.uploadattachments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadattachments() {
    debugger;
    this.LearningService.AttachmentsUpload(this.files).subscribe({
      next: (data) => {
        debugger;
        this.ChapterPhoto = data;
        Swal.fire('Attachment Uploaded');
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in AttachmentsUpload');
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

  edit() {
    debugger;
    var json = {
      ID: this.photoid,
      ChapterAttachmentUrl: this.photourl,
    };
    this.LearningService.UpdateChapterAttachment(json).subscribe({
      next: (data) => {
        debugger;
        let result = data;
        Swal.fire(' Updated  Successfully...!');
        this.LearningService.GetChapterAttachmentByChapterID(this.id).subscribe(
          {
            next: (data) => {
              debugger;
              this.Attachmentlist = data;
              this.files1 = [];
            },
            error: (err: { error: { message: any } }) => {
              Swal.fire('Issue in GetChapterAttachmentByChapterID');
              // Insert error in Db Here//
              var obj = {
                PageName: this.currentUrl,
                ErrorMessage: err.error.message,
              };
              this.LearningService.InsertExceptionLogs(obj).subscribe(
                (data) => {
                  debugger;
                }
              );
            },
          }
        );
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in ChapterAttachmentByChapterID');
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

  Edit(attchments: any) {
    this.photourl = attchments.originalurl;
    this.photoid = attchments.id;
  }

  Add() {
    for (let i = 0; i < this.Attachment.length; i++) {
      var entity = {
        ChapterID: this.id,
        ChapterAttachmentUrl: this.Attachment[i],
      };
      this.LearningService.InsertChapterAttachment(entity).subscribe({
        next: (data) => {
          debugger;
          Swal.fire('Added Successfully...!');
          this.Attachment.length = 0;
          this.files1.length = 0;
          this.files1 = [];
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in InsertChapterAttachment');
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

  public GetChapterAttachmentByChapter() {
    this.LearningService.GetChapterAttachmentByChapterID(this.id).subscribe({
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

  clickonimage(photo: any) {
    this.image = photo;
  }

  onSelect2(event: any) {
    this.files1.length = 0;
    this.files1 = [];
    console.log(event);
    this.files1.push(...event.addedFiles);
    this.uploadattachments2();
  }

  public uploadattachments2() {
    debugger;
    this.LearningService.AttachmentsUpload(this.files1).subscribe({
      next: (data) => {
        debugger;
        this.photourl = data;
        console.log('Attchaments', this.Attachment);
        Swal.fire('Attachment Uploaded');
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in AttachmentsUpload');
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

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.courseID = item.id;
  }

}


