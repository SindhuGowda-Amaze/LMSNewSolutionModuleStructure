import { Component, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import * as ClassicEditor from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from 'ckeditor4-angular';



@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  Course_Photo: any
  Attachment: any[] = [];
  result: any;

  constructor(public LearningService: LearningService, private ActivatedRoute: ActivatedRoute) { }
  public Editor = CKEditorModule;
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
  show:any;
  Attachmentlist:any;
  assessmentName:any;
  generalInstructions:any;


  ngOnInit(): void {
    this.courseID=0;
    this.GetCourse();
    

    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
        this.show=1
        this.GetChapter();
        
        this.LearningService.GetChapterAttachmentByChapterID(this.id).subscribe(data => {
          debugger
          this.Attachmentlist = data;
        })
        
      }
      else{
        this.show=0;
      }
    })
  }
  showChapterPhoto:any;
  public GetChapter(){
    this.LearningService.GetChapter().subscribe(
      data => {
      this.result = data;
      debugger
      this.result=this.result.filter((x: { id: any; })=>x.id==Number(this.id));
      this.courseID=this.result[0].courseID;
      this.name=this.result[0].name;
      this.description=this.result[0].description;
      this.ChapterPhoto=this.result[0].orginalChapterPhoto;
      this.showChapterPhoto=this.result[0].chapterPhoto;
      this.chapterText=this.result[0].chapterText;
      this.chapterID=this.result[0].courseID;
      this.assessmentName=this.result[0].assesmentName,
      this.generalInstructions=this.result[0].generalInstructions
  
        }
      ) 
    }

   
  Cancel() {
    location.href = "#/ChapterDashboard";
  }

  files1: File[] = [];

  onSelect1(event: any) {
    this.files1.length=0;
    this.files1=[];
    console.log(event);
    this.files1.push(...event.addedFiles);
    this.uploadattachments1();
  }

  onRemove1(event: any) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  file: any;
  public uploadattachments1() {
    debugger
    this.LearningService.AttachmentsUpload(this.files1).subscribe(res => {
      debugger
      this.file = res;
      this.Attachment.push(this.file);
      console.log("Attchaments",this.Attachment);
      Swal.fire("Attachment Uploaded");
    })
  }

  courselist:any;
  public GetCourse() {
    debugger
    this.LearningService.GetCourseDropdown().subscribe(
      data => {
        debugger
        this.courselist = data;
      })
  }


  
  getCourseID(even:any)
  {
    debugger
    this.courseID=even.target.value;
  }

  
  openAttchments(photo: any) {
    window.open(photo, "_blank")
  }
 





  Update(){
    debugger
     var json = {
      "ID": this.id,
      "courseID": this.courseID,
      "Name": this.name,
      "Description": this.description,
      "ChapterPhoto": this.ChapterPhoto,
      "ChapterText": this.chapterText ,
      "AssessmentName":this.assessmentName ,
      "GeneralInstructions":this.generalInstructions    
      };
    
      this.LearningService.UpdateChapter(json).subscribe(
        data => {
        debugger
        let result = data;
        Swal.fire("Updated Successfully ...!");
        location.href="#/ChapterDashboard";
      })
  }

  Save() {
    debugger
    if(this.courseID==undefined || this.name==undefined||this.description==undefined || this.ChapterPhoto==
      undefined|| this.chapterText==undefined || this.generalInstructions==undefined || this.assessmentName
      ==undefined || this.assessmentName=="" || this.generalInstructions=="")
    {
      Swal.fire("Please fill all the fields");
    }
    else{
      var json = {
        "courseID": this.courseID,
        "Name": this.name,
        "Description": this.description,
        "ChapterPhoto": this.ChapterPhoto,
        "ChapterText": this.chapterText ,
        "GeneralInstructions":this.generalInstructions,
        "AssessmentName":this.assessmentName       
      };
      this.LearningService.InsertChapter(json).subscribe(
        data => {
          debugger
          this.chapterID = data;
          this.insertAttchmentFiles()
          Swal.fire("Saved Successfully");
          location.href = "#/ChapterDashboard"
        })
    }
    
  }


  insertAttchmentFiles() {
    for (let i = 0; i < this.Attachment.length; i++) {
      var entity = {
        "ChapterID": this.chapterID,
        "ChapterAttachmentUrl": this.Attachment[i]
      }
      this.LearningService.InsertChapterAttachment(entity).subscribe(
        data => {
          debugger
         
        })
    }
  }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    debugger
    this.files.push(...event.addedFiles);
    this.uploadattachments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadattachments() {
    debugger
    this.LearningService.AttachmentsUpload(this.files).subscribe(res => {
      debugger
      this.ChapterPhoto = res;
      Swal.fire("Attachment Uploaded");
    })
  }









  edit(){
    debugger
     var json = {
           "ID": this.photoid,
           "ChapterAttachmentUrl": this.photourl,
      };   
      this.LearningService.UpdateChapterAttachment(json).subscribe(
        data => {
        debugger
        let result = data;
        Swal.fire(" Updated  Successfully...!");
        this.LearningService.GetChapterAttachmentByChapterID(this.id).subscribe(data => {
          debugger
          this.Attachmentlist = data;
          this.files1=[];
        })
      })
  }


  photourl:any;
  photoid:any;
  Edit(attchments:any){
    this.photourl=attchments.originalurl;
    this.photoid=attchments.id

  }

  Add(){
      for (let i = 0; i < this.Attachment.length; i++) {
        var entity = {
          "ChapterID": this.id,
          "ChapterAttachmentUrl": this.Attachment[i]
        }
        this.LearningService.InsertChapterAttachment(entity).subscribe(
          data => {
            debugger  
            Swal.fire("Added Successfully...!"); 
               this.Attachment.length=0;
               this.files1.length=0;
               this.files1=[];
              
            this.LearningService.GetChapterAttachmentByChapterID(this.id).subscribe(data => {
              debugger
              this.Attachmentlist = data;
            })   
          })    
    }
  }













  image:any
  clickonimage(photo:any){
   this.image=photo;
  }



  
  onSelect2(event: any) {
    this.files1.length=0;
    this.files1=[];
    console.log(event);
    this.files1.push(...event.addedFiles);
    this.uploadattachments2();
  }

  file1: any;
  public uploadattachments2() {
    debugger
    this.LearningService.AttachmentsUpload(this.files1).subscribe(res => {
      debugger
      this.photourl = res;
      console.log("Attchaments",this.Attachment);
      Swal.fire("Attachment Uploaded");
    })
  }






}
