import { Component, OnDestroy, OnInit } from '@angular/core'
import { forkJoin, Subject } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'
import { APIs, Service } from 'src/app/services'

@Component({
   selector: 'app-latest-news',
   templateUrl: './latest-news.component.html',
   styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit, OnDestroy {
   /** Subject that stops all hot observables */
   private _destroy$ = new Subject()

   articles?: any[]
   categories?: { [x: number]: any }

   constructor(private service: Service) {}

   ngOnInit(): void {
      this.getNews()
   }

   getNews() {
      forkJoin([
         this.service.get<any[]>(APIs().newsListing).pipe(map((e: any) => e.articles.filter((x: any) => x.showOnHomepage === true))),
         this.service.get<any[]>(APIs().newsCategoryListing).pipe(
            map((e: any) =>
               e.sourceCategory.reduce((acc: any, cur: any) => {
                  return { ...acc, [cur.id]: cur.name }
               }, {})
            )
         )
      ])
         .pipe(takeUntil(this._destroy$))
         .subscribe(([articles, categories]: any[]) => {
            this.articles = articles
            this.categories = categories
         })
   }

   ngOnDestroy() {
      this._destroy$.next()
      this._destroy$.complete()
   }
}
