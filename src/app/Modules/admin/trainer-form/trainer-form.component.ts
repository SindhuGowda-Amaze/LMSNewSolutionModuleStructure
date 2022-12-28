import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainer-form',
  templateUrl: './trainer-form.component.html',
  styleUrls: ['./trainer-form.component.css']
})
export class TrainerFormComponent implements OnInit {

  constructor(private LearningService: LearningService, private ActivatedRoute: ActivatedRoute) { }

  id: any;
  result: any;
  TrainerName: any;
  PhoneNumber: any;
  EmailID: any;
  Address: any;
  YearOfExperience: any;
  Company_logo: any;
  SkillsAndTechnology: any;
  TrainerFeePerCourse: any;
  files: File[] = [];
  currentUrl: any;
  dropdownSettings: any = {};
  TrainerID: any;
  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.TrainerName = "0"
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.GetNewstaff();

    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
        this.GetTrainer();
      }
    })
  }


  TrainerName2:any;
  GetTrainer() {


    this.LearningService.GetTrainer()
      .subscribe({
        next: data => {
          debugger
          this.result = data;
          this.result = this.result.filter((x: { id: any; }) => x.id == Number(this.id));
           this.TrainerName = this.result[0].staffID;
          this.PhoneNumber = this.result[0].phoneNo;
          this.EmailID = this.result[0].email;
          this.Address = this.result[0].address;
          this.YearOfExperience = this.result[0].yearOfExperience;
          this.Company_logo = this.result[0].resume;
          this.SkillsAndTechnology = this.result[0].skillAndTecchnology;
          this.TrainerFeePerCourse = this.result[0].trainerFee;
          this.TrainerName2= this.result[0].name;
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
  }

  Trainerlist: any;
  StaffID: any;

  public GetNewstaff() {
    this.LearningService.GetAllStaffNew().subscribe(data => {
      debugger
      this.Trainerlist = data
      console.log("manager", this.Trainerlist)
    });
  }

  public onItemSelect(item: any) {
    debugger
    console.log(item);
    // this.TrainerName = item.name;
    // this.StaffID = item.id
  }

  getTrainerID(even: any) {
    debugger
    this.TrainerID = even.target.value;
    this.LearningService.GetAllStaffNew().subscribe(data => {
      debugger
      let list = data.filter(x=>x.id==this.TrainerID)
      this.StaffID=list[0].id
      this.TrainerName1=list[0].name
      console.log("manager", this.Trainerlist)
    });
  }
  TrainerName1:any;

  Submit() {
    debugger

    if (this.TrainerName == undefined || this.PhoneNumber == undefined || this.EmailID == undefined || this.Address == undefined ||
      this.YearOfExperience == undefined || this.Company_logo == undefined || this.SkillsAndTechnology == undefined ||
      this.TrainerFeePerCourse == undefined) {
      Swal.fire("Please fill all the fields");
    }
    else {
 
      var json = {
        "Name": this.TrainerName1,
        "PhoneNo": this.PhoneNumber,
        "Email": this.EmailID,
        "Address": this.Address,
        "YearOfExperience": this.YearOfExperience,
        "Resume": this.Company_logo,
        "SkillAndTecchnology": this.SkillsAndTechnology,
        "TrainerFee": this.TrainerFeePerCourse,
        "StaffID": this.StaffID
      };
      this.LearningService.InsertTrainer(json)

        .subscribe({
          next: data => {
            debugger
            let id = data;
            Swal.fire("Successfully Saved...!");
            location.href = "#/Admin/Trainer"
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in InsertTrainer');
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

  }

  Update() {
    debugger
    var json = {
      "ID": this.id,
      "Name": this.TrainerName1==null?this.TrainerName2:this.TrainerName1,
      "PhoneNo": this.PhoneNumber,
      "Email": this.EmailID,
      "Address": this.Address,
      "YearOfExperience": this.YearOfExperience,
      "Resume": this.Company_logo,
      "SkillAndTecchnology": this.SkillsAndTechnology,
      "TrainerFee": this.TrainerFeePerCourse,
      "StaffID": this.StaffID==null?this.TrainerName:this.StaffID
    };

    this.LearningService.UpdateTrainer(json)

      .subscribe({
        next: data => {
          debugger
          let result = data;
          Swal.fire("Successfully Updated...!");
          location.href = "#/Admin/Trainer";
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in UpdateTrainer');
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



  onSelect(event: { addedFiles: any; }) {
    // if ((event.addedFiles[0].size ) > 5242880) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    if (this.files.length == 0) {
      Swal.fire('Invalid Attachment Type');
    }
    else if ((event.addedFiles[0].size) > 5242880) {
      Swal.fire('Please Upload File Less than 5 MB.')
    }
    // if ((event.addedFiles[0].size / 1048576) > 1) {
    //   Swal.fire('Please Upload File Less than 1 MB.')
    // } 
    else {
      this.uploadattachments();
      console.log("content", this.files);
    }
  }
  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  public uploadattachments() {
    debugger
    this.LearningService.AttachmentsUpload(this.files)

      .subscribe({
        next: data => {
          debugger
          this.Company_logo = data;
          Swal.fire("Attachment Uploaded");
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in AttachmentsUpload');
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

  //   Cancel() {
  //     location.href = "#/Trainer";
  //   }
}
