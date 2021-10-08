import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { LayoutComponent } from './components/layout/layout.component'
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
            path: 'news-list',
            component: NewsListComponent
         }
      ]
   }
]

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class NewsRoutingModule {}
