import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string ='';

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    const user = await this.authService.loginWithEmailPassword(this.email, this.password);
    if (user) {
      console.log('Login successful', user);
      // Optionally navigate to another page after successful login
      await this.router.navigate(['tabs']);
    } else {
      console.error('Login failed');
    }
  }
}
