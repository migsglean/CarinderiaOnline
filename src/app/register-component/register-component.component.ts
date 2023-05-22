import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  loading = false;
  show: boolean = false;

  mobilePattern = "^(09|\+639)\d{9}$";

  gender = ["Male", "Female"];
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      studentId: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      middleName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      streetAddress:['', Validators.required],
      barangay:['', Validators.required],
      city:['', Validators.required],
      zipCode:['', Validators.required]
    });
  }

  password() {
    this.show = !this.show;
  }

  onSubmit() { 
    this.submitted = true;
    
    var phone = this.form.value.phoneNumber 

    if (this.form.invalid) {
      return alert("Please answer all input fields");
    }

    if (this.form.value.studentId) {
      this.http.get("https://localhost:7003/api/users/account/" + this.form.value.studentId, this.form.value.studentId)
      .subscribe((resultData: any) => {
        
        if (resultData) {
          alert("Student ID is already exist!")
        } else {
          this.loading = true ;

          this.http.post("https://localhost:7003/api/users/register", this.form.value).subscribe((resultData: any) => {
            console.log(resultData)
            this.router.navigate(["/"])
            alert("Student Registered Successfully")
          })
        }
      })
    }
  }

}
