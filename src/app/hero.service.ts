import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes'; // URL to web api
  private headers = new Headers({'Content-Type': 'applciation/json'}); // id's the body content type in the request header

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http
      .get(this.heroesUrl) // return rxjs Observable
      .toPromise() // turn Observable to Promise
      .then(response => response.json().data as Hero[]) // call json method and resolve response (an array) to Hero[]
      .catch(this.handleError); // catch err and send to handler
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({ name: name }),
      { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers}) // id which hero the server should update by encoding the hero id in the URL
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error); // for demo only
    return Promise.reject(error.message || error);
  }

}
