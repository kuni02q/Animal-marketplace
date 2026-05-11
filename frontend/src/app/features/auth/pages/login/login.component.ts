import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private router: Router , private authService: AuthService) { }


  login() {
    this.authService.login({
      login: this.username,
      password: this.password,
    }).subscribe(res =>{
      this.authService.saveToken(res.token);
      this.router.navigate(['/'])
    })
  }


}
