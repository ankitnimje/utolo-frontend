import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleLoginProvider, AuthService, SocialUser } from 'angularx-social-login';
import { stringify } from 'querystring';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth: boolean = false;
  private SERVER_URL = environment.SERVER_URL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser | ResponseModel>(null);

  constructor(private authService: AuthService,
              private httpClient: HttpClient)
              {
                authService.authState.subscribe((user: SocialUser) => {
                  if(user !== null) {
                    this.auth = true;
                    this.authState$.next(this.auth);
                    this.userData$.next(user);
                  }
                });
              }
  // Login user with email and password
  loginUser(email: string, password: string) {
    this.httpClient.post(`${this.SERVER_URL}/auth/login`, {email, password})
      .subscribe((data: ResponseModel) => {
        this.auth = data.auth;
        this.authState$.next(this.auth);
        this.userData$.next(data);
      });
  }

  // Google Authentication
  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
  }
}

export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
}
