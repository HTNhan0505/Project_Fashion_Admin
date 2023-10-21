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
  }

  submitForm(): void {
    if (this.validateForm.invalid) {
      return;
    }

    const loginData = {
      email: this.validateForm.value.email,
      password: this.validateForm.value.password
    };

    // Gửi yêu cầu đăng nhập tới API
    this.http.post('http://192.168.90.101:8000/users/login', loginData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token)
        this.route.navigateByUrl('/home')

        console.log('Login successful:', response.token);
      },
      (error: any) => {
        if (error.status == 401) {
          this.errorText = "login or password incorrect"
          setTimeout(() => {
            this.errorText = ""
          }, 3000)

        }
        console.error('Login error:', error);
      }
    );
  }

}
