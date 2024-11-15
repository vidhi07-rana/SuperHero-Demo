import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone:true,
  imports: [MatToolbarModule, RouterLink, MatButtonModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  loggedin$!: Observable<boolean>;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loggedin$ = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
