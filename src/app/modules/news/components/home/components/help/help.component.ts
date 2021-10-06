import { Component, OnInit } from '@angular/core'

@Component({
   selector: 'app-help',
   templateUrl: './help.component.html',
   styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
   items: any[] = [
      {
         text: 'Find place',
         icon: './assets/images/place.svg'
      },
      {
         text: 'A’awen',
         icon: './assets/images/eye.svg'
      },
      {
         text: 'Omniyat',
         icon: './assets/images/information.svg'
      },
      {
         text: 'Give Time',
         icon: './assets/images/time.svg'
      },
      {
         text: 'Tofoula',
         icon: './assets/images/face.svg'
      },
      {
         text: 'Fundraising',
         icon: './assets/images/place.svg'
      },
      {
         text: 'Zakat',
         icon: './assets/images/hand.svg'
      }
   ]

   constructor() {}

   ngOnInit(): void {}
}
