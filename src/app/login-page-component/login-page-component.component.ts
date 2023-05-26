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

  onSubmit() {
    this.submitted = true

    if(this.form.invalid) {
      console.log(this.form.value)
      return
    }

    this.authService.login(this.form.value)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data === null) {
            return alert("Incorrect student id or password")
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
