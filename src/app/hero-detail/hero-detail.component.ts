import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Hero, HeroService } from '../hero.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatIconModule]
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;
  isLoading = true;

  constructor(private route: ActivatedRoute, private heroService: HeroService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadHeroDetails(id);
    }
  }

  loadHeroDetails(id: string): void {
    this.isLoading = true;
    this.heroService.getHeroById(id).subscribe(
      (hero) => {
        this.hero = hero;
        this.updateFavoriteStatus();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching hero details:', error);
        this.isLoading = false;
      }
    );
  }

  toggleFavorite(hero: Hero): void {
    this.heroService.toggleFavorite(hero);
    this.updateFavoriteStatus();
  }

  private updateFavoriteStatus(): void {
    if (this.hero) {
      this.heroService.getHeroTeam().subscribe((team) => {
        this.hero.favorite = !!team.find((teamHero) => teamHero.id === this.hero!.id);
      });
    }
  }
}
