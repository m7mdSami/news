import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HttpClientModule } from '@angular/common/http'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { NewsRoutingModule } from './news-routing.module'
import { HomeComponent } from './components/home/home.component'
import { HeaderComponent } from './components/header/header.component'
import { MenuComponent } from './components/header/components/menu/menu.component'
import { LayoutComponent } from './components/layout/layout.component'
import { SliderComponent } from './components/home/components/slider/slider.component'
import { LatestNewsComponent } from './components/home/components/latest-news/latest-news.component'
import { ArticleCardComponent } from './components/home/components/article-card/article-card.component'
import { HelpComponent } from './components/home/components/help/help.component'

@NgModule({
   declarations: [HomeComponent, HeaderComponent, MenuComponent, LayoutComponent, SliderComponent, LatestNewsComponent, ArticleCardComponent, HelpComponent],
   imports: [CommonModule, NewsRoutingModule, HttpClientModule, AngularSvgIconModule.forRoot(), NgbModule]
})
export class NewsModule {}
