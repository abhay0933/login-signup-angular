import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  step: number = 1;
  email: string = '';
  fullName: string = '';
  password: string = '';
  orgName: string = '';
  orgId: string = '';
  designation: string = '';
  birthDate: string = '';
  city: string = '';
  pincode: string = '';
  showThankYouPage: boolean = false;
  emailError: boolean = false;
  fullNameError: boolean = false;
  passwordError: boolean = false;
  orgNameError: boolean = false;
  orgIdError: boolean = false;
  designationError: boolean = false;
  birthDateError: boolean = false;
  cityError: boolean = false;
  pincodeError: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  public onNext() {
    if (this.step === 1) {
      this.emailError = !this.validateEmail(this.email);
      this.fullNameError = !this.fullName.trim();
      this.passwordError = !this.password.trim();

      if (this.emailError || this.fullNameError || this.passwordError) {
        this.errorMessage = 'Please correct the errors above.';
        return;
      }

      this.step = 2;
      this.errorMessage = '';
    } else if (this.step === 2) {
      this.orgNameError = !this.orgName.trim();
      this.orgIdError = !this.orgId.trim();
      this.designationError = !this.designation.trim();
      this.birthDateError = !this.birthDate.trim();
      this.cityError = !this.city.trim();
      this.pincodeError = !this.pincode.trim();

      if (this.orgNameError || this.orgIdError || this.designationError || this.birthDateError || this.cityError || this.pincodeError) {
        this.errorMessage = 'Please correct the errors above.';
        return;
      }

      const userData = {
        email: this.email,
        fullName: this.fullName,
        password: this.password,
        orgName: this.orgName,
        orgId: this.orgId,
        designation: this.designation,
        birthDate: this.birthDate,
        city: this.city,
        pincode: this.pincode
      };

      localStorage.setItem('userData', JSON.stringify(userData));

      this.showThankYouPage = true;
      this.successMessage = 'Redirecting you to the Login screen. This might take a few seconds...';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000); 
    }
  }
  goBack() {
    if (this.step === 2) {
      this.step = 1;
    }
  }

  private validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
