import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { forkJoin, Subject } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'
import { APIs, Service } from 'src/app/services'

@Component({
   selector: 'app-news-details',
   templateUrl: './news-details.component.html',
   styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
   /** Subject that stops all hot observables */
   private _destroy$ = new Subject()

   articles?: any[]
   categories?: { [x: number]: any }

   constructor(private service: Service, private route: ActivatedRoute) {}

   ngOnInit(): void {
      this.getNews()
   }

   getNews() {
      let articleId = this.route.snapshot.paramMap.get('id')
      forkJoin([
         this.service.get<any[]>(APIs().newsListing).pipe(map((e: any) => e.articles.filter((x: any) => x.id == articleId))),
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
}
