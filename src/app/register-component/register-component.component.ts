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
  gender = ["Male", "Female"];
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      studentId: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      gender: ['', Validators.required],
      middleName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      emailAddress: ['', [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      phoneNumber: ['', [ Validators.required, Validators.pattern('^(09)\\d{9}')]],
      streetAddress:['', Validators.required],
      barangay:['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      city:['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      zipCode:['', Validators.required]
    });
  }

  get f() { return this.form.controls }

  password() {
    this.show = !this.show;
  }

  onSubmit() { 
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.studentId) {
      this.http.get("https://localhost:7003/api/users/account/" + this.form.value.studentId, this.form.value.studentId)
      .subscribe({
        next: (resultData: any) => {
          if (resultData) {
            alert("Student ID is already exist!")
          } else {
            this.loading = true ;
            this.http.post("https://localhost:7003/api/users/register", this.form.value).subscribe({
              next: () => {
                this.router.navigate(["/"])
              },
              error: error => {
                console.log(error)
              }
            })
          }
       },
       error: error =>  {
        console.log(error)
       }
      })
    }
  }

}
