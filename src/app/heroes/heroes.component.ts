import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
//after navigation
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
// before navigation
// export class HeroesComponent implements OnInit {
//hero = 'Windstorm';
/*
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };*/

// selectedHero?: Hero;

// heroes: Hero[] = [];

/*   constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  } */
// heroes = HEROES;

//hero service added

/*
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }*/
// While you could call getHeroes() in the constructor, that's not the best practice. Reserve the constructor for minimal initialization such as wiring constructor parameters to properties. The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests to a remote server as a real data service would.Instead, call getHeroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit() at an appropriate time after constructing a HeroesComponent instance.

//when we used observable objects in hero service
//The previous version assigns an array of heroes to the component's heroes property. The assignment occurs synchronously, as if the server could return heroes instantly or the browser could freeze the UI while it waited for the server's response.That won't work when the HeroService is actually making requests of a remote server.The new version waits for the Observable to emit the array of heroes, which could happen now or several minutes from now. The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.This asynchronous approach works when the HeroService requests heroes from the server.

//   getHeroes(): void {
//     this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
//   }

//   ngOnInit(): void {
//     this.getHeroes();
//   }
// }

/*The HeroService.getHeroes() method has a synchronous signature, which implies that the HeroService can fetch heroes synchronously. The HeroesComponent consumes the getHeroes() result as if heroes could be fetched synchronously.

src/app/heroes/heroes.component.ts
content_copy
this.heroes = this.heroService.getHeroes();
This approach won't work in a real application that uses asynchronous calls. It works now because your service synchronously returns mock heroes.

If getHeroes() can't return immediately with hero data, it shouldn't be synchronous, because that would block the browser as it waits to return data.

HeroService.getHeroes() must have an asynchronous signature of some kind.

In this tutorial, HeroService.getHeroes() returns an Observable so that it can use the Angular HttpClient.get method to fetch the heroes and have HttpClient.get() return an Observable.*/
