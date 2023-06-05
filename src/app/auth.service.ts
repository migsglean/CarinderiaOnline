import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =  'https://localhost:7003/api/users/login'
  
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('account')!));
    this.user = this.userSubject.asObservable();
   }

  public get userValue() {
    return this.userSubject.value;
  }


  login(credentials: { studentId: string; password: string }) {
    return this.http.post<User>(`${this.apiUrl}`, credentials)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('account', JSON.stringify(user))
        localStorage.setItem('user', credentials.studentId);
        this.userSubject.next(user);
        return user;
    }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('account');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
}
}
