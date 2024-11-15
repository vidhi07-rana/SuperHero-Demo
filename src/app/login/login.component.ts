import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {



  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const token = 'SuperHero Token';
    this.authService.login(token);
    this.router.navigate(['/home']);
  }
}
