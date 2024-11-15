import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from '../hero.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroSearchComponent } from "../hero-search/hero-search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, HeroSearchComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  heroes: Hero[] = [];
  ifLoading = true;
  heroTeam: Hero[] = [];

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.loadHeroes();

    this.heroService.getHeroTeam().subscribe((team) => {
      this.heroTeam = team;
      this.updateFavoriteStatus();
    });
  }

  loadHeroes(): void {
    this.ifLoading = true;
    this.heroService.getHeroes().subscribe(
      (heroes) => {
        this.heroes = heroes;
        this.updateFavoriteStatus(); 
        this.ifLoading = false;
      },
      (error) => {
        console.error('Error fetching heroes:', error);
        this.ifLoading = false;
      }
    );
  }

  viewHeroDetails(id: number): void {
    this.router.navigate(['/knowyourheros', id]);
  }

  toggleFavorite(hero: Hero): void {
    this.heroService.toggleFavorite(hero);
  }

  private updateFavoriteStatus(): void {
    this.heroes.forEach((hero) => {
      hero.favorite = !!this.heroTeam.find((teamHero) => teamHero.id === hero.id);
    });
  }
}
