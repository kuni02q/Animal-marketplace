import { Component } from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {


  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe(res => {
      this.authService.saveToken(res.token);

      this.router.navigate(['/']);
    });
  }



}
