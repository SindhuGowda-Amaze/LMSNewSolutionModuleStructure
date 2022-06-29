import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  constructor(private LearningService: LearningService, private ActivatedRoute: ActivatedRoute) { }

  id:any;
  result:any;

  Name:any;
  Description:any;
  

  ngOnInit(): void {
    this.GetCategoryMaster();

    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
        this.GetCategoryMaster();
      }
    })
  }

  GetCategoryMaster() {
    this.LearningService.GetCategoryMaster().subscribe(
    data => {
    debugger
    this.result = data;
		this.result=this.result.filter((x: { id: any; })=>x.id==Number(this.id));
		this.Name=this.result[0].name;
		this.Description=this.result[0].description;
      }
    ) 
  }


  Save(){
    debugger 
    if(this.Name==undefined || this.Description==undefined)
    {
      Swal.fire("Please fill all the fields");
    }
  else{
    var json = {
      "Name": this.Name,
      "Description": this.Description  
    };
    this.LearningService.InsertCategoryMaster(json).subscribe(
      (data:any) => {
        debugger
        let id = data;
        if(data!=0)
        {
          Swal.fire("Saved Successfully");
          location.href="#/CategoryDashboard";
        }
        else{
          Swal.fire("Name Already Exists");
        }
       
      })
  }
  }


  Update(){
    debugger
     var json = {
      "ID": this.id,
      "Name": this.Name,
      "Description": this.Description,  
      };
    
      this.LearningService.UpdateCategoryMaster(json).subscribe(
        data => {
        debugger
        let result = data;
        Swal.fire("Successfully Updated...!");
        location.href="#/CategoryDashboard";
      })
  }

  Cancel() {
    location.href = "#/CategoryDashboard";
  }

}
