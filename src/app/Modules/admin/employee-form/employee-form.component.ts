import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import {
  NgWizardConfig,
  NgWizardService,
  StepChangedArgs,
  StepValidationArgs,
  STEP_STATE,
  THEME,
  TOOLBAR_POSITION,
  TOOLBAR_BUTTON_POSITION,
} from 'ng-wizard';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden,
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.circles,
    toolbarSettings: {},
  };
  Company_logo: any;
  files: File[] = [];
  Title: any;
  PlaceO_f_Birth: any;
  Status: any;
  Name: any;
  Country_Of_Birth: any;
  Date_Of_Marriage: any;
  Middle_Name: any;
  Age: any;
  Personal_Email: any;
  Last_Name: any;
  Gender: any;
  Mobile: any;
  RoleType: any;
  Supervisor: any;
  RoleTypeList: any;
  supervisorlist: any;
  Religion: any;
  Ethnicity: any;
  Citizen_Ship: any;
  Nationality: any;
  Is_Disabled: any;
  MajorIllness: any;
  Is_Color_Blind: any;
  IS_Night_Blind: any;
  Weight: any;
  Height: any;
  Blood_Group: any;
  DependentName: any;
  Relationship: any;
  DateOfBirth: any;
  Address: any;
  Is_Dependent: any;
  Id_Number: any;
  Is_Child_Adopted: any;
  Race: any;
  CitizenShip: any;
  Gender1: any;
  Working_Status: any;
  Request_Type: any;
  Dependent: any;
  Percentage: any;
  NomineeType: any;
  GuardianName: any;
  GuardianRelationship: any;
  ComapanyName: any;
  StartDate: any;
  EndDate: any;
  Salary: any;
  CurrentEmployer: any;
  EducationType: any;
  Qualification: any;
  NameOfQualification: any;
  Branch: any;
  InstitutionName: any;
  Country: any;
  ScoreType: any;
  Grade: any;
  StartDateMonth: any;
  StartDateYear: any;
  EndDateMonth: any;
  EndDateYear: any;
  NameOfBank: any;
  AccountHolderName: any;
  BankAccountNumber: any;
  IDType: any;
  Number: any;
  NameOnDocument: any;
  IssueDate: any;
  ExpiryDate: any;
  IssuingAuthority: any;
  PlaceOfIssue: any;
  VisaType: any;
  VisaNumber: any;
  VisaIssueDate: any;
  VisaExpiryDate: any;
  EmployeeName: any;
  Grade1: any;
  Designation: any;
  PayRateType: any;
  PayStructure: any;
  EffectiveFromDate: any;
  Reason: any;
  EmployeeCode: any;
  OfficialEmail: any;
  Band: any;
  Grade2: any;
  JobRole: any;
  Manager: any;
  EmployeeType: any;
  EmployeeStatus: any;
  NoticePeriod: any;
  ProbationPeriod: any;
  ConfirmationDueDate: any;
  ConfirmationStatus: any;
  AddressType: any;
  Relationship1: any;
  FindPlace: any;
  AddressLine1: any;
  AddressLine2: any;
  AddressLine3: any;
  AddressLine4: any;
  District: any;
  Province: any;
  Country1: any;
  SubDistrictPostcode: any;
  Mobile1: any;
  LandLineFax: any;
  IsCorrespondance: any;
  RequestType: any;
  EmergencyContactName: any;
  EmergencyContactRelationship: any;
  EmergencyContactMobileNumber: any;
  EmergencyContactOfficeNumber: any;
  EmergencyContactLandLineNumber: any;
  EmergencyContact_EmailID: any;
  EmergencyContact_Address: any;
  StaffID: any;
  ID: any;
  BuildingID: any;
  PhoneNo: any;
  EmailID: any;
  TypeID: any;
  Attachment: any;
  JoiningDate: any;
  LeavesPerMonth: any;
  WorkTimings: any;
  ContactNumber: any;
  EmployeeID: any;
  ChaildTotal: any;
  MedicalLeaveEntitlement: any;
  MaternitityLeaveEntitlement: any;
  PaternitityLeaveEntitlement: any;
  CompassionateLeaveEntitlement: any;
  Leavesfrompreviousyear: any;
  ExtendedChildcareLeaveEntitlement: any;
  MarriageLeaveEntitlement: any;
  leavelist: any;
  DOB: any;
  currentUrl:any;
  constructor(
    public LearningService: LearningService,
    private ngWizardService: NgWizardService,
    public router: Router,
    private ActivatedRoute: ActivatedRoute,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {

    this.currentUrl = window.location.href;
    debugger;
    this.GetRoleType();
    this.GetMyDetails();

    this.ActivatedRoute.params.subscribe((params) => {
      debugger;
      this.ID = params['id'];
      this.StaffID = params['id'];
      if (this.ID == undefined) {
        (this.Title = ' '),
          (this.Name = ' '),
          (this.Middle_Name = ' '),
          (this.Last_Name = ' '),
          (this.PlaceO_f_Birth = ' '),
          (this.Country_Of_Birth = ' '),
          (this.Age = ' '),
          (this.Gender = ' '),
          (this.Status = ' '),
          (this.Date_Of_Marriage = ' '),
          (this.Personal_Email = ' '),
          (this.Mobile = ' '),
          (this.Religion = ' '),
          (this.Citizen_Ship = ' '),
          (this.Ethnicity = ' '),
          (this.Nationality = ' '),
          (this.Is_Disabled = ' '),
          (this.Blood_Group = ' '),
          (this.Height = ' '),
          (this.Weight = ' '),
          (this.MajorIllness = ' '),
          (this.IS_Night_Blind = ' '),
          (this.Is_Color_Blind = ''),
          (this.EmployeeCode = ' '),
          (this.OfficialEmail = ' '),
          (this.Band = ' '),
          (this.Grade = ' '),
          (this.JobRole = ' '),
          (this.Manager = ' '),
          (this.EmployeeType = ' '),
          (this.EmployeeStatus = ' '),
          (this.NoticePeriod = ' '),
          (this.ProbationPeriod = ' '),
          (this.ConfirmationDueDate = ' '),
          (this.ConfirmationStatus = ' '),
          (this.EmployeeName = ' '),
          (this.AddressType = ' '),
          (this.Relationship = ' '),
          (this.FindPlace = ' '),
          (this.AddressLine1 = ' '),
          (this.AddressLine2 = ' '),
          (this.AddressLine3 = ' '),
          (this.AddressLine4 = ' '),
          (this.District = ' '),
          (this.Province = ' '),
          (this.Country = ' '),
          (this.SubDistrictPostcode = ' '),
          (this.Mobile = ' '),
          (this.LandLineFax = ' '),
          (this.IsCorrespondance = ' '),
          (this.RequestType = ' '),
          (this.EmergencyContactName = ' '),
          (this.EmergencyContactRelationship = ' '),
          (this.EmergencyContactMobileNumber = ' '),
          (this.EmergencyContactOfficeNumber = ' '),
          (this.EmergencyContactLandLineNumber = ' '),
          (this.EmergencyContact_EmailID = ' '),
          (this.EmergencyContact_Address = ' '),
          (this.DependentName = ' '),
          (this.Relationship = ' '),
          (this.Gender = ' '),
          (this.DateOfBirth = ' '),
          (this.Address = ' '),
          (this.Mobile = ' '),
          (this.Is_Dependent = ' '),
          (this.Id_Number = ' '),
          (this.Is_Child_Adopted = ' '),
          (this.Race = ' '),
          (this.CitizenShip = ' '),
          (this.Country_Of_Birth = ' '),
          (this.Religion = ' '),
          (this.Working_Status = ' '),
          (this.Request_Type = ' '),
          (this.Dependent = ' '),
          (this.Percentage = ' '),
          (this.NomineeType = ' '),
          (this.GuardianName = ' '),
          (this.GuardianRelationship = ' '),
          (this.ComapanyName = ' '),
          (this.Title = ' '),
          (this.StartDate = ' '),
          (this.EndDate = ' '),
          (this.Salary = ' '),
          (this.CurrentEmployer = ' '),
          (this.EducationType = ' '),
          (this.Qualification = ' '),
          (this.NameOfQualification = ' '),
          (this.Branch = ' '),
          (this.InstitutionName = ' '),
          (this.Country = ' '),
          (this.ScoreType = ' '),
          (this.Grade = ' '),
          (this.StartDateMonth = ' '),
          (this.StartDateYear = ' '),
          (this.EndDateMonth = ' '),
          (this.EndDateYear = ' '),
          (this.NameOfBank = ' '),
          (this.AccountHolderName = ' '),
          (this.BankAccountNumber = ' '),
          (this.IDType = ' '),
          (this.Number = ' '),
          (this.NameOnDocument = ' '),
          (this.IssueDate = ' '),
          (this.ExpiryDate = ' '),
          (this.IssuingAuthority = ' '),
          (this.PlaceOfIssue = ' '),
          (this.VisaType = ' '),
          (this.VisaNumber = ' '),
          (this.VisaIssueDate = ' '),
          (this.VisaExpiryDate = ' '),
          (this.EmployeeName = ' '),
          (this.Grade = ' '),
          (this.Designation = ' '),
          (this.PayRateType = ' '),
          (this.PayStructure = ' '),
          (this.EffectiveFromDate = ' '),
          (this.Reason = ' ');
      } else {
        this.LearningService.GetMyDetails()
        
        .subscribe({
          next: data => {
            debugger
           
          this.leavelist = data.filter((x) => x.id == this.ID);
          (this.Title = this.leavelist[0].title),
            (this.Name = this.leavelist[0].name),
            (this.Middle_Name = this.leavelist[0].middle_Name),
            (this.Last_Name = this.leavelist[0].last_Name),
            (this.PlaceO_f_Birth = this.leavelist[0].placeO_f_Birth),
            (this.Country_Of_Birth = this.leavelist[0].country_Of_Birth),
            (this.Age = this.leavelist[0].age),
            (this.Gender = this.leavelist[0].gender),
            (this.Status = this.leavelist[0].status),
            (this.Date_Of_Marriage = this.datepipe.transform(
              this.leavelist[0].date_Of_Marriage,
              'yyyy-MM-dd'
            )),
            (this.Personal_Email = this.leavelist[0].personal_Email),
            (this.Mobile = this.leavelist[0].mobile),
            (this.Religion = this.leavelist[0].religion),
            (this.Citizen_Ship = this.leavelist[0].citizen_Ship),
            (this.Ethnicity = this.leavelist[0].ethnicity),
            (this.Nationality = this.leavelist[0].nationality),
            (this.Is_Disabled = this.leavelist[0].is_Disabled),
            (this.Blood_Group = this.leavelist[0].blood_Group),
            (this.Height = this.leavelist[0].height),
            (this.Weight = this.leavelist[0].weight),
            (this.MajorIllness = this.leavelist[0].majorIllness),
            (this.IS_Night_Blind = this.leavelist[0].iS_Night_Blind),
            (this.Is_Color_Blind = this.leavelist[0].is_Color_Blind),
            (this.DOB = this.datepipe.transform(
              this.leavelist[0].dob,
              'yyyy-MM-dd'
            )),
            (this.JoiningDate = this.datepipe.transform(
              this.leavelist[0].joiningDate,
              'yyyy-MM-dd'
            )),
            (this.RoleType = this.leavelist[0].type),
            (this.Supervisor = this.leavelist[0].supervisor);
          }, error: (err) => {
            Swal.fire('Issue in GetMyDetails');
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
        


        this.LearningService.GetPositionDetails()
        .subscribe({
          next: data => {
            debugger
            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.EmployeeCode = this.leavelist[0].employeeCode),
              (this.OfficialEmail = this.leavelist[0].officialEmail),
              (this.Band = this.leavelist[0].band),
              (this.Grade = this.leavelist[0].grade),
              (this.JobRole = this.leavelist[0].jobRole),
              (this.Manager = this.leavelist[0].manager),
              (this.EmployeeType = this.leavelist[0].employeeType),
              (this.EmployeeStatus = this.leavelist[0].employeeStatus),
              (this.NoticePeriod = this.leavelist[0].noticePeriod),
              (this.ProbationPeriod = this.leavelist[0].probationPeriod),
              (this.ConfirmationDueDate = this.datepipe.transform(
                this.leavelist[0].confirmationDueDate,
                'yyyy-MM-dd'
              )),
              (this.ConfirmationStatus = this.leavelist[0].confirmationStatus),
              (this.EmployeeName = this.leavelist[0].employeeName);
          }, error: (err) => {
            Swal.fire('Issue in GetPositionDetails');
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
        
  

        this.LearningService.GetMyAddressDetails()
        
        .subscribe({
          next: data => {
            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.AddressType = this.leavelist[0].addressType),
              (this.Relationship = this.leavelist[0].relationship),
              (this.FindPlace = this.leavelist[0].findPlace),
              (this.AddressLine1 = this.leavelist[0].addressLine1),
              (this.AddressLine2 = this.leavelist[0].addressLine2),
              (this.AddressLine3 = this.leavelist[0].addressLine3),
              (this.AddressLine4 = this.leavelist[0].addressLine4),
              (this.District = this.leavelist[0].district),
              (this.Province = this.leavelist[0].province),
              (this.Country = this.leavelist[0].country),
              (this.SubDistrictPostcode = this.leavelist[0].subDistrictPostcode),
              (this.Mobile = this.leavelist[0].mobile),
              (this.LandLineFax = this.leavelist[0].landLineFax),
              (this.IsCorrespondance = this.leavelist[0].isCorrespondance),
              (this.RequestType = this.leavelist[0].requestType),
              (this.EmergencyContactName =
                this.leavelist[0].emergencyContactName),
              (this.EmergencyContactRelationship =
                this.leavelist[0].emergencyContactRelationship),
              (this.EmergencyContactMobileNumber =
                this.leavelist[0].emergencyContactMobileNumber),
              (this.EmergencyContactOfficeNumber =
                this.leavelist[0].emergencyContactOfficeNumber),
              (this.EmergencyContactLandLineNumber =
                this.leavelist[0].emergencyContactLandLineNumber),
              (this.EmergencyContact_EmailID =
                this.leavelist[0].emergencyContact_EmailID),
              (this.EmergencyContact_Address =
                this.leavelist[0].emergencyContact_Address);
          }, error: (err) => {
            Swal.fire('Issue in GetMyAddressDetails');
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
        

        this.LearningService.GetDependentDetails()
        .subscribe({
          next: data => {
            debugger
          
            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.DependentName = this.leavelist[0].dependentName),
              (this.Relationship1 = this.leavelist[0].relationship),
              (this.Gender1 = this.leavelist[0].gender),
              (this.DateOfBirth = this.datepipe.transform(
                this.leavelist[0].dateOfBirth,
                'yyyy-MM-dd'
              )),
              (this.Address = this.leavelist[0].address),
              (this.Mobile = this.leavelist[0].mobile),
              (this.Is_Dependent = this.leavelist[0].is_Dependent),
              (this.Id_Number = this.leavelist[0].id_Number),
              (this.Is_Child_Adopted = this.leavelist[0].is_Child_Adopted),
              (this.Race = this.leavelist[0].race),
              (this.CitizenShip = this.leavelist[0].citizenShip),
              (this.Country_Of_Birth = this.leavelist[0].country_Of_Birth),
              (this.Religion = this.leavelist[0].religion),
              (this.Working_Status = this.leavelist[0].working_Status),
              (this.Request_Type = this.leavelist[0].request_Type);
          }, error: (err) => {
            Swal.fire('Issue in GetDependentDetails');
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
        this.LearningService.GetNomination()
        .subscribe({
          next: data => {
            debugger
            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.Dependent = this.leavelist[0].dependent),
              (this.Percentage = this.leavelist[0].percentage),
              (this.NomineeType = this.leavelist[0].nomineeType),
              (this.GuardianName = this.leavelist[0].guardianName),
              (this.GuardianRelationship =
                this.leavelist[0].guardianRelationship);
          }, error: (err) => {
            Swal.fire('Issue in GetNomination');
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
        this.LearningService.GetEmploymentDetails()
        .subscribe({
          next: data => {
            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.ComapanyName = this.leavelist[0].comapanyName),
              (this.Title = this.leavelist[0].title),
              (this.StartDate = this.datepipe.transform(
                this.leavelist[0].startDate,
                'yyyy-MM-dd'
              )),
              (this.EndDate = this.datepipe.transform(
                this.leavelist[0].endDate,
                'yyyy-MM-dd'
              )),
              (this.Salary = this.leavelist[0].salary),
              (this.CurrentEmployer = this.leavelist[0].currentEmployer);
          }, error: (err) => {
            Swal.fire('Issue in Getting Expenses List Web');
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
        
        
        
        


        this.LearningService.GetEducationDetails()
        
        .subscribe({
          next: data => {
            debugger;

            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.EducationType = this.leavelist[0].educationType),
              (this.Qualification = this.leavelist[0].qualification),
              (this.NameOfQualification = this.leavelist[0].nameOfQualification),
              (this.Branch = this.leavelist[0].branch),
              (this.InstitutionName = this.leavelist[0].institutionName),
              (this.Country = this.leavelist[0].country),
              (this.ScoreType = this.leavelist[0].scoreType),
              (this.Grade = this.leavelist[0].grade),
              (this.StartDateMonth = this.datepipe.transform(
                this.leavelist[0].startDateMonth,
                'yyyy-MM-dd'
              )),
              (this.StartDateYear = this.datepipe.transform(
                this.leavelist[0].startDateYear,
                'yyyy-MM-dd'
              )),
              (this.EndDateMonth = this.datepipe.transform(
                this.leavelist[0].endDateMonth,
                'yyyy-MM-dd'
              )),
              (this.EndDateYear = this.datepipe.transform(
                this.leavelist[0].endDateYear,
                'yyyy-MM-dd'
              ));
          }, error: (err) => {
            Swal.fire('Issue in GetEducationDetails');
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
        
 

        this.LearningService.GetBankDetails()
        
        .subscribe({
          next: data => {
            debugger;

            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.NameOfBank = this.leavelist[0].nameOfBank),
              (this.AccountHolderName = this.leavelist[0].accountHolderName),
              (this.BankAccountNumber = this.leavelist[0].bankAccountNumber);
          }, error: (err) => {
            Swal.fire('Issue in GetBankDetails');
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

        this.LearningService.GetID_Details()
        
        .subscribe({
          next: data => {
            debugger;

            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.IDType = this.leavelist[0].idType),
              (this.Number = this.leavelist[0].number),
              (this.NameOnDocument = this.leavelist[0].nameOnDocument),
              (this.IssueDate = this.datepipe.transform(
                this.leavelist[0].issueDate,
                'yyyy-MM-dd'
              )),
              (this.ExpiryDate = this.datepipe.transform(
                this.leavelist[0].expiryDate,
                'yyyy-MM-dd'
              )),
              (this.IssuingAuthority = this.leavelist[0].issuingAuthority),
              (this.PlaceOfIssue = this.leavelist[0].placeOfIssue);
          }, error: (err) => {
            Swal.fire('Issue in GetID_Details');
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
        

        this.LearningService.GetVisaDetails()
        .subscribe({
          next: data => {
            debugger;

            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.VisaType = this.leavelist[0].visaType),
              (this.VisaNumber = this.leavelist[0].visaNumber),
              (this.VisaIssueDate = this.datepipe.transform(
                this.leavelist[0].visaIssueDate,
                'yyyy-MM-dd'
              )),
              (this.VisaExpiryDate = this.datepipe.transform(
                this.leavelist[0].visaExpiryDate,
                'yyyy-MM-dd'
              ));
          }, error: (err) => {
            Swal.fire('Issue in GetVisaDetails');
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
        

        this.LearningService.GetSalaryDetails()
        
        .subscribe({
          next: data => {
            debugger
            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.EmployeeName = this.leavelist[0].employeeName),
              (this.Grade = this.leavelist[0].grade),
              (this.Designation = this.leavelist[0].designation),
              (this.PayRateType = this.leavelist[0].payRateType),
              (this.PayStructure = this.leavelist[0].payStructure),
              (this.EffectiveFromDate = this.datepipe.transform(
                this.leavelist[0].effectiveFromDate,
                'yyyy-MM-dd'
              )),
              (this.Reason = this.leavelist[0].reason);
          }, error: (err) => {
            Swal.fire('Issue in GetSalaryDetails');
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
    });
  }

  public GetRoleType() {
    this.LearningService.GetRoleType()
    .subscribe({
      next: data => {
        debugger;
        this.RoleTypeList = data;
      }, error: (err) => {
        Swal.fire('Issue in GetRoleType');
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

  public GetMyDetails() {
    this.LearningService.GetMyDetails()
    
    .subscribe({
      next: data => {
        debugger;
      this.supervisorlist = data;
      }, error: (err) => {
        Swal.fire('Issue in GetMyDetails');
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

  stepChanged(args: StepChangedArgs) {
    debugger;

    // console.log(args.step)
    // window.scroll({
    //   top: 0,
    //   left: 0,    debugger
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    //   behavior: 'smooth'
    // });

    // if ((args instanceof NavigationEnd)) {

    //   window.scrollTo(0, 0)
    // }
  }

  onSelect(event: { addedFiles: any }) {
    debugger;
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.uploadattachments();
    console.log('content', this.files);
  }

  onRemove(event: any) {
    debugger;
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadattachments() {
    debugger;
    this.LearningService.AttachmentsUpload(this.files)
    
    .subscribe({
      next: data => {
        debugger;
      this.Company_logo = data;
      alert('Attachment Uploaded');
      }, error: (err) => {
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

  public Save() {
    debugger;

    var eb = {
      BuildingID: 56,
      Name: this.Name,
      PhoneNo: this.Mobile,
      EmailID: this.Personal_Email,
      'TypeID ': this.RoleType,
      Address: this.Address,
      Attachment: this.Attachment,
      JoiningDate: this.JoiningDate,
      Salary: this.Salary,
      LeavesPerMonth: this.LeavesPerMonth,
      WorkTimings: this.WorkTimings,
      ContactNumber: this.ContactNumber,
      'Supervisor ': this.Supervisor,
      EmployeeID: this.EmployeeID,
      ResignationDate: this.JoiningDate,
      ChaildTotal: 10,
      MedicalLeaveEntitlement: 10,
      MaternitityLeaveEntitlement: 10,
      PaternitityLeaveEntitlement: 10,
      CompassionateLeaveEntitlement: 10,
      Leavesfrompreviousyear: 10,
      ExtendedChildcareLeaveEntitlement: 10,
      MarriageLeaveEntitlement: 10,
      Title: this.Title,
      Middle_Name: this.Middle_Name,
      Last_Name: this.Last_Name,
      PlaceO_f_Birth: this.PlaceO_f_Birth,
      Country_Of_Birth: this.Country_Of_Birth,
      Age: this.Age,
      Gender: this.Gender,
      Status: this.Status,
      Date_Of_Marriage:
        this.Date_Of_Marriage == undefined
          ? '2021-12-16'
          : this.Date_Of_Marriage,

      Religion: this.Religion,
      Citizen_Ship: this.Citizen_Ship,
      Ethnicity: this.Ethnicity,
      Nationality: this.Nationality,
      Is_Disabled: this.Is_Disabled,
      Blood_Group: this.Blood_Group,
      Height: this.Height,
      Weight: this.Weight,
      MajorIllness: this.MajorIllness,
      IS_Night_Blind: this.IS_Night_Blind,
      Is_Color_Blind: this.Is_Color_Blind,
      DOB: this.DOB,
    };
    this.LearningService.InsertMyDetails(eb)
    
    .subscribe({
      next: data => {
        debugger
        this.StaffID = data;
        Swal.fire('Saved Succesfully');
        this.SaveDependantDetails();
        this.SaveNomination();
        this.SaveEmployment();
        this.SaveEducation();
        this.SaveIdDetails();
        this.SaveBankDetails();
        this.SaveVisaDetails();
        this.SaveSalaryDetails();
        this.SaveAddressDetails();
        this.SavePositionDetails();
      }, error: (err) => {
        Swal.fire('Issue in InsertMyDetails');
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

  public Update() {
    debugger;
    var eb = {
      ID: this.ID,
      BuildingID: 56,
      Name: this.Name,
      PhoneNo: this.Mobile,
      EmailID: this.Personal_Email,
      'TypeID ': this.RoleType,
      Address: this.Address,
      Attachment: this.Attachment,
      JoiningDate: this.JoiningDate,
      Salary: this.Salary,
      LeavesPerMonth: this.LeavesPerMonth,
      WorkTimings: this.WorkTimings,
      ContactNumber: this.ContactNumber,
      'Supervisor ': this.Supervisor,
      EmployeeID: this.EmployeeID,
      ResignationDate: this.JoiningDate,
      ChaildTotal: 10,
      MedicalLeaveEntitlement: 10,
      MaternitityLeaveEntitlement: 10,
      PaternitityLeaveEntitlement: 10,
      CompassionateLeaveEntitlement: 10,
      Leavesfrompreviousyear: 10,
      ExtendedChildcareLeaveEntitlement: 10,
      MarriageLeaveEntitlement: 10,
      Title: this.Title,
      Middle_Name: this.Middle_Name,
      Last_Name: this.Last_Name,
      PlaceO_f_Birth: this.PlaceO_f_Birth,
      Country_Of_Birth: this.Country_Of_Birth,
      Age: this.Age,
      Gender: this.Gender,
      Status: this.Status,
      Date_Of_Marriage:
        this.Date_Of_Marriage == undefined
          ? '2021-12-16'
          : this.Date_Of_Marriage,
      Religion: this.Religion,
      Citizen_Ship: this.Citizen_Ship,
      Ethnicity: this.Ethnicity,
      Nationality: this.Nationality,
      Is_Disabled: this.Is_Disabled,
      Blood_Group: this.Blood_Group,
      Height: this.Height,
      Weight: this.Weight,
      MajorIllness: this.MajorIllness,
      IS_Night_Blind: this.IS_Night_Blind,
      Is_Color_Blind: this.Is_Color_Blind,
      DOB: this.DOB,
    };
    this.LearningService.UpdateStaff(eb)
    
    .subscribe({
      next: data => {
        debugger
        this.UpdateDependentDetails();
        this.UpdateNomination();
        this.UpdateEmploymentDetails();
        this.UpdateEducationDetails();
        this.UpdateID_Details();
        this.UpdateBankDetails();
        this.UpdateVisaDetails();
        this.UpdateSalaryDetails();
        this.UpdateMyAddressDetails();
        this.UpdatePositionDetails();
      }, error: (err) => {
        Swal.fire('Issue in Getting Expenses List Web');
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

  public SaveDependantDetails() {
    debugger;

    var eb = {
      DependentName: this.DependentName,
      Relationship: this.Relationship,
      Gender: this.Gender1,
      DateOfBirth: this.DateOfBirth,
      Address: this.Address,
      Mobile: this.Mobile,
      Is_Dependent: this.Is_Dependent,
      Id_Number: this.Id_Number,
      Is_Child_Adopted: this.Is_Child_Adopted,
      Race: this.Race,
      CitizenShip: this.CitizenShip,
      Country_Of_Birth: this.Country_Of_Birth,
      Religion: this.Religion,
      Working_Status: this.Working_Status,
      Request_Type: this.Request_Type,
      StaffID: this.StaffID,
    };
    this.LearningService.InsertDependentDetails(eb)
    .subscribe({
      next: data => {
      
      }, error: (err) => {
        Swal.fire('Issue in Getting Expenses List Web');
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

  public SaveNomination() {
    debugger;

    var eb = {
      Dependent: this.Dependent,
      Percentage: this.Percentage,
      NomineeType: this.NomineeType,
      GuardianName: this.GuardianName,
      GuardianRelationship: this.GuardianRelationship,
      StaffID: this.StaffID,
    };
    this.LearningService.InsertNomination(eb)
    .subscribe({
      next: data => {
        debugger
       
      }, error: (err) => {
        Swal.fire('Issue in InsertNomination');
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

  public SaveEmployment() {
    debugger;

    var eb = {
      ComapanyName: this.ComapanyName,
      Title: this.Title,
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      Salary: this.Salary,
      CurrentEmployer: this.CurrentEmployer,
      StaffID: this.StaffID,
    };
    this.LearningService.InsertEmploymentDetails(eb)
    
    .subscribe({
      next: data => {
        debugger
      
      }, error: (err) => {
        Swal.fire('Issue in InsertEmploymentDetails');
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

  public SaveEducation() {
    debugger;

    var eb = {
      EducationType: this.EducationType,
      Qualification: this.Qualification,
      NameOfQualification: this.NameOfQualification,
      Branch: this.Branch,
      InstitutionName: this.InstitutionName,
      Country: this.Country,
      ScoreType: this.ScoreType,
      Grade: this.Grade,
      StartDateMonth: this.StartDateMonth,
      StartDateYear: this.StartDateMonth,
      EndDateMonth: this.EndDateMonth,
      EndDateYear: this.EndDateMonth,
      StaffID: this.StaffID,
    };
    this.LearningService.InsertEducationDetails(eb)
    
    .subscribe({
      next: data => {
        debugger
      
      }, error: (err) => {
        Swal.fire('Issue in InsertEducationDetails');
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

  public SaveIdDetails() {
    debugger;

    var eb = {
      IDType: this.IDType,
      Number: this.Number,
      NameOnDocument: this.NameOnDocument,
      IssueDate: this.IssueDate,
      ExpiryDate: this.ExpiryDate,
      IssuingAuthority: this.IssuingAuthority,
      PlaceOfIssue: this.PlaceOfIssue,
      StaffID: this.StaffID,
    };
    this.LearningService.InsertID_Details(eb)
    
    .subscribe({
      next: data => {
        debugger
        
      }, error: (err) => {
        Swal.fire('Issue in InsertID_Details');
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

  public SaveBankDetails() {
    debugger;

    var eb = {
      NameOfBank: this.NameOfBank,
      AccountHolderName: this.AccountHolderName,
      BankAccountNumber: this.BankAccountNumber,
      StaffID: this.StaffID,
    };
    this.LearningService.InsertBankDetails(eb)
    
    .subscribe({
      next: data => {
        debugger
       
      }, error: (err) => {
        Swal.fire('Issue in InsertBankDetails');
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

  public SaveVisaDetails() {
    debugger;

    var eb = {
      VisaType: this.VisaType,
      VisaNumber: this.VisaNumber,
      VisaIssueDate: this.VisaIssueDate,
      VisaExpiryDate: this.VisaExpiryDate,
      StaffID: this.StaffID,
    };
    this.LearningService.InsertVisaDetails(eb)
    
    .subscribe({
      next: data => {
        debugger
      
      }, error: (err) => {
        Swal.fire('Issue in InsertVisaDetails');
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

  public SaveSalaryDetails() {
    debugger;

    var eb1 = {
      EmployeeName: this.EmployeeName,
      Grade: this.Grade,
      Designation: this.Designation,
      PayRateType: this.PayRateType,
      PayStructure: this.PayStructure,
      EffectiveFromDate: this.EffectiveFromDate,
      Reason: this.Reason,
      StaffID: this.StaffID,
    };
    this.LearningService.InsertSalaryDetails(eb1)
    
    .subscribe({
      next: data => {
        debugger
       
      }, error: (err) => {
        Swal.fire('Issue in InsertSalaryDetails');
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

  public SaveAddressDetails() {
    debugger;

    var eb = {
      AddressType: this.AddressType,

      FindPlace: this.FindPlace,
      AddressLine1: this.AddressLine1,
      AddressLine2: this.AddressLine2,
      AddressLine3: this.AddressLine3,
      AddressLine4: this.AddressLine4,
      District: this.District,
      Province: this.Province,
      Country: this.Country1,
      SubDistrictPostcode: this.SubDistrictPostcode,
      Mobile: this.Mobile1,
      LandLineFax: this.LandLineFax,
      IsCorrespondance: this.IsCorrespondance,
      RequestType: this.RequestType,
      EmergencyContactName: this.EmergencyContactName,
      EmergencyContactRelationship: this.EmergencyContactRelationship,
      EmergencyContactMobileNumber: this.EmergencyContactMobileNumber,
      EmergencyContactOfficeNumber: this.EmergencyContactOfficeNumber,
      EmergencyContactLandLineNumber: this.EmergencyContactLandLineNumber,
      EmergencyContact_EmailID: this.EmergencyContact_EmailID,
      EmergencyContact_Address: this.EmergencyContact_Address,
      StaffID: this.StaffID,
    };
    this.LearningService.InsertMyAddressDetails(eb)
    
    .subscribe({
      next: data => {
        debugger;
      Swal.fire('Saved successfully.');
      this.router.navigate(['/Staffdashboard']);
      }, error: (err) => {
        Swal.fire('Issue in Getting Expenses List Web');
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

  public getRoleType(event: any) {
    debugger;
    this.RoleType = event.target.value;
  }

  public SavePositionDetails() {
    debugger;

    var eb = {
      EmployeeCode: this.EmployeeCode,
      OfficialEmail: this.OfficialEmail,
      Band: this.Band,
      Grade: this.Grade2,
      JobRole: this.JobRole,
      Manager: this.Manager,
      EmployeeType: this.EmployeeType,
      EmployeeStatus: this.EmployeeStatus,
      NoticePeriod: this.NoticePeriod,
      ProbationPeriod: this.ProbationPeriod,
      ConfirmationDueDate: this.ConfirmationDueDate,
      ConfirmationStatus: this.ConfirmationStatus,
      EmployeeName: this.EmployeeName,
      StaffID: this.StaffID,
    };
    this.LearningService.InsertPositionDetails(eb)
    
    .subscribe({
      next: data => {
       
      }, error: (err) => {
        Swal.fire('Issue in InsertPositionDetails');
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

  public UpdateDependentDetails() {
    debugger;

    var eb = {
      ID: this.StaffID,
      DependentName: this.DependentName,
      Relationship: this.Relationship,
      Gender: this.Gender1,
      DateOfBirth: this.DateOfBirth,
      Address: this.Address,
      Mobile: this.Mobile,
      Is_Dependent: this.Is_Dependent,
      Id_Number: this.Id_Number,
      Is_Child_Adopted: this.Is_Child_Adopted,
      Race: this.Race,
      CitizenShip: this.CitizenShip,
      Country_Of_Birth: this.Country_Of_Birth,
      Religion: this.Religion,
      Working_Status: this.Working_Status,
      Request_Type: this.Request_Type,
    };
    this.LearningService.UpdateDependentDetails(eb)
    
    .subscribe({
      next: data => {
        debugger
 
      }, error: (err) => {
        Swal.fire('Issue in UpdateDependentDetails');
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

  public UpdateNomination() {
    debugger;

    var eb = {
      ID: this.StaffID,
      Dependent: this.Dependent,
      Percentage: this.Percentage,
      NomineeType: this.NomineeType,
      GuardianName: this.GuardianName,
      GuardianRelationship: this.GuardianRelationship,
    };
    this.LearningService.UpdateNomination(eb)
    
    .subscribe({
      next: data => {
        debugger
        
      }, error: (err) => {
        Swal.fire('Issue in UpdateNomination');
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

  public UpdateEmploymentDetails() {
    debugger;

    var eb = {
      ID: this.StaffID,
      ComapanyName: this.ComapanyName,
      Title: this.Title,
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      Salary: this.Salary,
      CurrentEmployer: this.CurrentEmployer,
    };
    this.LearningService.UpdateEmploymentDetails(eb)
    .subscribe({
      next: data => {
        debugger
       
      }, error: (err) => {
        Swal.fire('Issue in UpdateEmploymentDetails');
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

  public UpdateEducationDetails() {
    debugger;

    var eb = {
      ID: this.StaffID,
      EducationType: this.EducationType,
      Qualification: this.Qualification,
      NameOfQualification: this.NameOfQualification,
      Branch: this.Branch,
      InstitutionName: this.InstitutionName,
      Country: this.Country,
      ScoreType: this.ScoreType,
      Grade: this.Grade,
      StartDateMonth: this.StartDateMonth,
      StartDateYear: this.StartDateMonth,
      EndDateMonth: this.EndDateMonth,
      EndDateYear: this.EndDateMonth,
    };
    this.LearningService.UpdateEducationDetails(eb)
    
    .subscribe({
      next: data => {
        debugger
      
      }, error: (err) => {
        Swal.fire('Issue in UpdateEducationDetails');
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

  public UpdateID_Details() {
    debugger;

    var eb = {
      ID: this.StaffID,

      IDType: this.IDType,
      Number: this.Number,
      NameOnDocument: this.NameOnDocument,
      IssueDate: this.IssueDate,
      ExpiryDate: this.ExpiryDate,
      IssuingAuthority: this.IssuingAuthority,
      PlaceOfIssue: this.PlaceOfIssue,
    };
    this.LearningService.UpdateID_Details(eb)
    
    .subscribe({
      next: data => {
        debugger
        
      }, error: (err) => {
        Swal.fire('Issue in UpdateID_Details');
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

  public UpdateBankDetails() {
    debugger;

    var eb = {
      ID: this.StaffID,
      NameOfBank: this.NameOfBank,
      AccountHolderName: this.AccountHolderName,
      BankAccountNumber: this.BankAccountNumber,
    };
    this.LearningService.UpdateBankDetails(eb)
    
    .subscribe({
      next: data => {
        debugger
       
      }, error: (err) => {
        Swal.fire('Issue in UpdateBankDetails');
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

  public UpdateVisaDetails() {
    debugger;

    var eb = {
      ID: this.StaffID,

      VisaType: this.VisaType,
      VisaNumber: this.VisaNumber,
      VisaIssueDate: this.VisaIssueDate,
      VisaExpiryDate: this.VisaExpiryDate,
    };
    this.LearningService.UpdateVisaDetails(eb)
    .subscribe({
      next: data => {
        debugger
       
      }, error: (err) => {
        Swal.fire('Issue in UpdateVisaDetails');
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

  public UpdateSalaryDetails() {
    debugger;

    var eb1 = {
      ID: this.StaffID,
      EmployeeName: this.EmployeeName,
      Grade: this.Grade,
      Designation: this.Designation,
      PayRateType: this.PayRateType,
      PayStructure: this.PayStructure,
      EffectiveFromDate: this.EffectiveFromDate,
      Reason: this.Reason,
    };
    this.LearningService.UpdateSalaryDetails(eb1)
    .subscribe({
      next: data => {
        debugger
       
      }, error: (err) => {
        Swal.fire('Issue in UpdateSalaryDetails');
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

  public UpdateMyAddressDetails() {
    debugger;

    var eb = {
      ID: this.StaffID,
      AddressType: this.AddressType,

      FindPlace: this.FindPlace,
      AddressLine1: this.AddressLine1,
      AddressLine2: this.AddressLine2,
      AddressLine3: this.AddressLine3,
      AddressLine4: this.AddressLine4,
      District: this.District,
      Province: this.Province,
      Country: this.Country1,
      SubDistrictPostcode: this.SubDistrictPostcode,
      Mobile: this.Mobile1,
      LandLineFax: this.LandLineFax,
      IsCorrespondance: this.IsCorrespondance,
      RequestType: this.RequestType,
      EmergencyContactName: this.EmergencyContactName,
      EmergencyContactRelationship: this.EmergencyContactRelationship,
      EmergencyContactMobileNumber: this.EmergencyContactMobileNumber,
      EmergencyContactOfficeNumber: this.EmergencyContactOfficeNumber,
      EmergencyContactLandLineNumber: this.EmergencyContactLandLineNumber,
      EmergencyContact_EmailID: this.EmergencyContact_EmailID,
      EmergencyContact_Address: this.EmergencyContact_Address,
    };
    this.LearningService.UpdateMyAddressDetails(eb)
    
    .subscribe({
      next: data => {
        debugger;
      Swal.fire('Saved successfully.');
      this.router.navigate(['/Staffdashboard']);
      }, error: (err) => {
        Swal.fire('Issue in UpdateMyAddressDetails');
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

  public UpdatePositionDetails() {
    debugger;

    var eb = {
      ID: this.StaffID,
      EmployeeCode: this.EmployeeCode,
      OfficialEmail: this.OfficialEmail,
      Band: this.Band,
      Grade: this.Grade2,
      JobRole: this.JobRole,
      Manager: this.Manager,
      EmployeeType: this.EmployeeType,
      EmployeeStatus: this.EmployeeStatus,
      NoticePeriod: this.NoticePeriod,
      ProbationPeriod: this.ProbationPeriod,
      ConfirmationDueDate: this.ConfirmationDueDate,
      ConfirmationStatus: this.ConfirmationStatus,
      EmployeeName: this.EmployeeName,
    };
    this.LearningService.UpdatePositionDetails(eb)
    .subscribe({
      next: data => {
        debugger
        Swal.fire('Updated Successfully');
        this.router.navigate(['/Employeedashboard']);
      }, error: (err) => {
        Swal.fire('Issue in UpdatePositionDetails');
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
