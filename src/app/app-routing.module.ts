import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
   {
      path: '',
      loadChildren: () => import('./modules/news/news.module').then((m) => m.NewsModule),
      data: { preload: true }
   }
]

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {}
