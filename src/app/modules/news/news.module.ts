import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NewsRoutingModule } from './news-routing.module'
import { HomeComponent } from './components/home/home.component'
import { HeaderComponent } from './components/home/components/header/header.component'

@NgModule({
   declarations: [HomeComponent, HeaderComponent],
   imports: [CommonModule, NewsRoutingModule]
})
export class NewsModule {}
