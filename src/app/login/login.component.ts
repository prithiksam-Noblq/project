import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'username' && this.password === 'password') {
      // Simulate login success
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/notes']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
