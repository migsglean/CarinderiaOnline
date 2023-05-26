import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page-component',
  templateUrl: './login-page-component.component.html',
  styleUrls: ['./login-page-component.component.scss']
})
export class LoginPageComponentComponent implements OnInit {
  form!: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      studentId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.form.controls
  }

  onSubmit() {
    this.submitted = true

    if(this.form.invalid) {
      console.log(this.form.value)
      return
    }

    this.http.post("https://localhost:7003/api/users/login", this.form.value)
      .subscribe({
        next: (data) => {
          if (data === null) {
            return alert("Incorrect student id or password")
          }
          this.router.navigate(["home"])
        },
        error: error => {
          console.log(error)
        }
      })


  }
}
