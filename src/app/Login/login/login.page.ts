import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CommenService } from 'src/services/commen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  // email: string = '';
  // password: string ='';
  loginForm: FormGroup;
  error: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private loader: CommenService,
    private fb: FormBuilder
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }


  async login() {
    if (this.loginForm.valid) {
      try {
        this.loader.showLoader();
        const user = await this.authService.loginWithEmailPassword(this.loginForm.value.email,
          this.loginForm.value.password);
        if (user) {
          this.error = false;
          this.loader.stopLoader(true);
          console.log('Login successful');
          // Optionally navigate to another page after successful login
          await this.router.navigate(['tabs']);
        } else {
          this.error = true;
          console.error('Login failed');
        }
      }
      catch(error){
        this.error = true;
        console.error('Error during login', error);
      } finally {
        this.loader.stopLoader();
      }
    }
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
