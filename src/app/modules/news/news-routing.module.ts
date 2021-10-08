import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { LayoutComponent } from './components/layout/layout.component'
import { NewsDetailsComponent } from './components/news-details/news-details.component'
import { NewsListComponent } from './components/news-list/news-list.component'

const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         {
            path: '',
            component: HomeComponent
         },
         {
            path: 'news',
            component: NewsListComponent
         },
         {
            path: 'news/:id',
            component: NewsDetailsComponent
         }
      ]
   }
]

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class NewsRoutingModule {}
