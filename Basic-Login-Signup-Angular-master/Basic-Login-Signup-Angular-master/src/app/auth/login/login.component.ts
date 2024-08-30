import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('hidden', style({
        opacity: 0,
        display: 'none'
      })),
      state('visible', style({
        opacity: 1,
        display: 'block'
      })),
      transition('hidden => visible', [
        style({ opacity: 0, display: 'block' }),
        animate('0.5s ease-in-out')
      ]),
      transition('visible => hidden', [
        animate('0.5s ease-in-out', style({ opacity: 0, display: 'none' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  dummyUsers = [
    { email: 'rivansh63@gmail.com', password: '123456789' },
  ];

  ngOnInit() {
    console.log('LoginComponent loaded');
  }

  constructor(private router: Router) { }

  public navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  public onLogin(event: Event) {
    event.preventDefault();

    this.emailError = false;
    this.passwordError = false;
    this.errorMessage = '';

    this.emailError = !this.validateEmail(this.email);
    this.passwordError = !this.password.trim();

    if (this.emailError || this.passwordError) {
      this.errorMessage = 'Please correct the errors above.';
      return;
    }

    const storedUserData = localStorage.getItem('userData');
    let users;

    if (storedUserData) {
      users = JSON.parse(storedUserData);
    } else {
      users = this.dummyUsers;
    }

    // const user = this.dummyUsers.find((u: { email: string; password: string; }) => u.email === this.email);

    if (users) {
      if (users.password === this.password) {
        this.isLoggedIn = true;
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Incorrect password';
        console.log(this.errorMessage);
      }
    } else {
      this.errorMessage = 'Invalid email.';
      console.log(this.errorMessage);
    }
  }

  private validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
