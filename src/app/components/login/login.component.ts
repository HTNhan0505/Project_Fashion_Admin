import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  validateForm!: FormGroup
  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router) { }
  errorText: any = ''

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    localStorage.removeItem("token");
    localStorage.removeItem("refeshToken");
  }
  submitForm(): void {
    if (this.validateForm.invalid) {
      this.errorText = "Username or password not empty"
      setTimeout(() => {
        this.errorText = ""
      }, 3000)
      return;
    }

    const loginData = {
      email: this.validateForm.value.email,
      password: this.validateForm.value.password
    };

    // Gửi yêu cầu đăng nhập tới API
    this.http.post('http://localhost:3000/users/login', loginData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('refeshToken', response.refresh_token)
        this.route.navigateByUrl('/home')

      },
      (error: any) => {
        if (error.status == 0) {
          this.errorText = "login or password incorrect"
          setTimeout(() => {
            this.errorText = ""
          }, 3000)

        }
      }
    );
  }

}
