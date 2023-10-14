import { Component, OnInit } from '@angular/core';
import { SupaService } from '../../services/supa.service'
import { Router } from '@angular/router';
/* import {
  
  RecaptchaVerifier,
  
} from 'firebase/auth'; */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  public name: string;
  public phone: string;
  public pin: string;
  pinErrorMessage: string = '';

  loggedIn: boolean
  showSpinner: boolean = false;
  verificationSpinner: boolean = false;

  constructor(private supaService: SupaService, private router: Router) {
    this.email = '';
    this.name = '';
    this.phone = '';
    this.pin = '';

    this.loggedIn = false;
  }
  ngOnInit(): void {
    localStorage.removeItem('temporaryData');
  }

  /* resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  } */

  async sendMagicLink() {
    this.showSpinner = true;
    const { data, error } = await this.supaService.signInWithPhone(this.phone);

    if (error) {
      console.error('Error al iniciar sesión:', error);

      this.loggedIn = false
    } else {
      localStorage.setItem('temporaryData', JSON.stringify({ name: this.name, phone: this.phone }));

      console.log('Usuario ha iniciado sesión:', data);

      this.loggedIn = true
    }
    this.showSpinner = false;

  }

  async verifyNumber() {

    this.verificationSpinner = true;
    this.pinErrorMessage = '';

    const { data, error } = await this.supaService.verifyPhoneNumber(this.phone, this.pin);

    if (error) {
      console.error('Error al verificar el pin:', error);
      this.pinErrorMessage = 'El pin introducido es erróneo.';
    } else {

      console.log('Pin verificado exitosamente:', data);
      this.router.navigate(['/welcome']);
    }

    this.verificationSpinner = false;
  }
}


