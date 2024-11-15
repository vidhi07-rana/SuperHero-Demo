import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from '../hero.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-team',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './hero-team.component.html',
  styleUrls: ['./hero-team.component.css']
})
export class HeroTeamComponent implements OnInit {
  heroTeam: Hero[] = [];

  constructor(private heroService: HeroService, private route: Router) {}

  ngOnInit(): void {
    this.heroService.getHeroTeam().subscribe((team: Hero[]) => {
      this.heroTeam = team;
    });
  }

  goToDetail(id: number): void {
    this.route.navigate(['/knowyourheros', id]);
  }

  toggleFavorite(hero: Hero): void {
    this.heroService.toggleFavorite(hero);
  }

  isFavorite(heroId: number): boolean {
    return this.heroTeam.some(hero => hero.id === heroId);
  }
}
        