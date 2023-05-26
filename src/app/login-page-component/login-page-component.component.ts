import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { 
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(['/']);
  }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      studentId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.form.controls
  }

  matchesRegex (value: string): Boolean {
    const regex = /^[a-zA-Z ]+$/
    return regex.test(value)
  }

  onSubmit() {
    this.submitted = true

    if(this.form.invalid) {
      return
    }

    this.authService.login(this.form.value)
      .pipe(first())
      .subscribe({
        next: (data) => {

          if (data.studentId === "admin" && data.password === "admin") {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'admin';
            this.router.navigateByUrl(returnUrl)
            return;
          }

          if (this.matchesRegex(this.f['studentId'].value)) {
            return alert("Invalid Student ID")
          }

          if (data.studentId == 'false') {
            return alert("Incorrect Student ID or Password")
          }

          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
          this.router.navigateByUrl(returnUrl)
        },
        error: error => {
          console.log(error)
        }
      })


  }
}
