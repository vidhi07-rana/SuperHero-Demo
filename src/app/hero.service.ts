import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Hero {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
  favorite: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private BaseUrl =
    'https://gateway.marvel.com:443/v1/public/characters?limit=20&ts=1&apikey=781a3025fbf1817f45b4830c8e56d76b&hash=33aeccf188a7f13c5ee0c9c25d12bc8b';
  private heroTeam = new BehaviorSubject<Hero[]>([]);

  constructor(private http: HttpClient) {
    const storedTeam = localStorage.getItem('heroTeam');
    if (storedTeam) {
      this.heroTeam.next(JSON.parse(storedTeam));
    }
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<any>(this.BaseUrl).pipe(
      map((response) => response.data.results)
    );
  }

  getHeroById(id: string): Observable<Hero> {
    const heroByIdUrl = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=781a3025fbf1817f45b4830c8e56d76b&hash=33aeccf188a7f13c5ee0c9c25d12bc8b`;
    return this.http.get<any>(heroByIdUrl).pipe(
      map((response) => response.data.results[0])
    );
  }

  getHeroTeam(): Observable<Hero[]> {
    return this.heroTeam.asObservable();
  }

  toggleFavorite(hero: Hero): void {
    hero.favorite = !hero.favorite;
   const currentTeam = this.heroTeam.getValue();
    let updatedTeam;
  
    if (hero.favorite) {
      updatedTeam = [...currentTeam, hero];
    } else {
      updatedTeam = currentTeam.filter((h) => h.id !== hero.id);
    }
  
    this.heroTeam.next(updatedTeam);
    localStorage.setItem('heroTeam', JSON.stringify(updatedTeam));
  }
  

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]); 
    }
    const searchUrl = `${this.BaseUrl}&nameStartsWith=${term}`;
    return this.http.get<any>(searchUrl).pipe(
      map(response => response.data.results)
    );
  }
}
