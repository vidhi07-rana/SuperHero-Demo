import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from '../hero.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]> | undefined;
  private searchTerms = new Subject<string>(); 

  constructor(private heroService: HeroService, private route: Router) {}

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

  search(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const term = inputElement.value || ''; 
    this.searchTerms.next(term);
  }

  onClick(id: number): void {
    this.route.navigate(['/knowyourheros', id]);
  }


 
}
