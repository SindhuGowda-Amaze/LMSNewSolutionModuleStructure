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
  
    constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }
  
    ngOnInit(): void {
      this.GetTrainerCourseMappingDashboard();
    }
    Trainerdetails:any;
  
    public GetTrainerCourseMappingDashboard() {
      debugger
      this.LearningService.GetTrainerCourseMappingDashboard().subscribe(
        data => {
          debugger
          this.Trainerdetails = data;
          this.count = this.Trainerdetails.length;
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
      this.LearningService.DeleteTrainerCourseMapping(id).subscribe(
        data => {
          debugger
          this.GetTrainerCourseMappingDashboard();
        }
      )
      Swal.fire('Successfully Deleted...!');
      this.ngOnInit();
        }
      });
    }
  
  
  
  }
  