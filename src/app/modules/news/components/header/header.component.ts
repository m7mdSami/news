import { Component, OnInit, ViewChild } from '@angular/core'
import { MenuComponent } from './components/menu/menu.component'

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   open: boolean = false
   _openSearch: boolean = false

   constructor() {}

   ngOnInit(): void {}

   openMenu() {
      this.open = !this.open
   }

   openSearch() {
      this._openSearch = !this._openSearch
   }
}
