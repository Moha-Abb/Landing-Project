import { Component, OnInit } from '@angular/core';
import { SupaService } from '../../services/supa.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  public name: string;
  public phone: string;
  loggedIn: boolean
  showSpinner: boolean = false;

  constructor(private supaService: SupaService) {
    this.email = '';
    this.name = '';
    this.phone = '';
    this.loggedIn = false;
  }
  ngOnInit(): void {
    localStorage.removeItem('temporaryData');
  }



  async sendMagicLink() {
    this.showSpinner = true;
    const { data, error } = await this.supaService.signInWithEmail(this.email, this.phone);
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

}

