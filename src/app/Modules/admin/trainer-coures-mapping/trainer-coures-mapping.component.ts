import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainer-coures-mapping',
  templateUrl: './trainer-coures-mapping.component.html',
  styleUrls: ['./trainer-coures-mapping.component.css']
})
export class TrainerCouresMappingComponent implements OnInit {

  search:any;
  count:any;
  Trainerdetails:any;
  currentUrl: any;
  
    constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }
  
    ngOnInit(): void {
      this.GetTrainerCourseMappingDashboard();
    }
    
  
    public GetTrainerCourseMappingDashboard() {
      debugger
      this.LearningService.GetTrainerCourseMappingDashboard()
      .subscribe({
        next: data => {
          debugger
          this.Trainerdetails = data;
          this.count = this.Trainerdetails.length;
        }, error: (err) => {
          Swal.fire('Issue in GetTrainerCourseMappingDashboard');
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
  
    edit(id: any) {
      debugger
      location.href = "#/TrainerCourseMappingForm/" + id;
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
      this.LearningService.DeleteTrainerCourseMapping(id)
      
      
      .subscribe({
        next: data => {
          debugger
          this.GetTrainerCourseMappingDashboard();
        }, error: (err) => {
          Swal.fire('Issue in DeleteTrainerCourseMapping');
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
  
  
  
  }
  