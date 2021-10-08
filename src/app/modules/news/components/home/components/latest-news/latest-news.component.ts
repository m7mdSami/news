import { Component, OnDestroy, OnInit } from '@angular/core'
import { forkJoin, Observable, of, Subject } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'
import { APIs, Service } from 'src/app/services'

const NEWS = {
   articles: [
      {
         id: 1,
         title: 'Vaccine hopes and M&A action power European stocks and U.S. equity futures - MarketWatch',
         content:
            'European stocks marched higher on Monday, alongside U.S. equity futures, driven by vaccine hopes, mergers and acquisitions news.The Stoxx Europe 600 index \r\n SXXP, \r\n +0.26%\r\nrose 0.5% after ending l… [+3119 chars]',
         sourceID: 1,
         urlToImage: 'https://images.mktw.net/im-231687/social',
         description: '',
         publishedAt: '2020-09-14T07:54:00Z',
         showOnHomepage: true
      },
      {
         id: 2,
         title: 'Neither Microsoft nor Oracle gets to buy TikTok US: Chinese state media - TechCrunch',
         content:
            'What a whirlwind of a Monday morning. Shortly after news broke that Microsoft is out of the picture in bidding for TikTok’s U.S. operations, and rumors began circulating that Oracle is the winner, Ch… [+1807 chars]',
         sourceID: 1,
         urlToImage: 'https://techcrunch.com/wp-content/uploads/2020/08/GettyImages-1227914650.jpeg?w=654',
         description:
            'What a whirlwind of a Monday morning. Shortly after news broke that Microsoft is out of the picture in bidding for TikTok’s U.S. operations, and rumors began circulating that Oracle is the winner, China’s state broadcaster CGTN reported that ByteDance will no…',
         publishedAt: '2020-09-14T07:45:36Z',
         showOnHomepage: false
      },
      {
         id: 3,
         title: 'Stocks rise as AstraZeneca resumes vaccine trial - Yahoo Finance',
         content:
            'Stocks rose worldwide on Monday as AstraZeneca (AZN.L) and Oxford University confirmed plans to resume a leading coronavirus vaccine trial.\r\nInvestors welcomed the restart of the late-stage study, wh… [+2264 chars]',
         sourceID: 1,
         urlToImage:
            'https://s.yimg.com/uu/api/res/1.2/oad8t9TYgP.NMeECJjr1tg--~B/aD0zMzczO3c9NDk5MDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2020-09/519a0930-f364-11ea-bffb-64367f2e833e',
         description: "The suspension of a leading coronavirus vaccine trial had dashed investors' hopes of economic recovery worldwide, but the trial will now continue.",
         publishedAt: '2020-09-14T07:38:00Z',
         showOnHomepage: true
      },
      {
         id: 4,
         title: "Tech's Bubble of Calm Is Likely to Prove Brief - Yahoo Finance",
         content:
            '(Bloomberg Opinion) --\r\nDont Get Too Comfortable\r\nIs it safe to put a price on technology again? After great excitement, the solemn date of Sept. 11 proved to be the first trading day of the month wh… [+11014 chars]',
         sourceID: 2,
         urlToImage: 'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png',
         description:
            '(Bloomberg Opinion) -- Don’t Get Too ComfortableIs it safe to put a price on technology again? After great excitement, the solemn date of Sept. 11 proved to be the first trading day of the month when the tech-heavy Nasdaq-100 didn’t move by more than 1%, in o…',
         publishedAt: '2020-09-14T06:34:05Z',
         showOnHomepage: false
      },
      {
         id: 5,
         title: 'A Porsche Panamera With Swangas Exists for the Sole Reason of Infuriating You - autoevolution',
         content:
            'In fact, Slabs are so popular that more car owners seem to be itching to get in on the game. Usually, the cars used to make Slabs are cheaper, older American models, decked out in candy paint, fitted… [+1485 chars]',
         sourceID: 3,
         urlToImage: 'https://s1.cdn.autoevolution.com/images/news/a-porsche-panamera-with-swangas-exists-for-the-sole-reason-of-infuriating-you-148657-7.jpg',
         description:
            'Slabs are a “love it or hate it” type of thing. They are part of the Slab Culture originating in the ‘80s in Houston and, to this day, they’re still a big thing.',
         publishedAt: '2020-09-14T04:30:00Z',
         showOnHomepage: true
      },
      {
         id: 6,
         title: 'Dow futures jump 300 points as tech stocks look to recover - MarketWatch',
         content:
            'U.S. stock index futures rose late Sunday, as a series of deals raised hopes that battered stocks would recover after the tech-heavy Nasdaq ended its worst week since March. As of midnight Eastern, D… [+682 chars]',
         sourceID: 2,
         urlToImage: 'https://s.wsj.net/public/resources/MWimages/MW-GP644_MicroS_ZG_20180906154215.jpg',
         description: '',
         publishedAt: '2020-09-14T04:02:00Z',
         showOnHomepage: false
      },
      {
         id: 7,
         title: 'Zipline and Walmart to launch drone deliveries of health and wellness products - The Verge',
         content:
            'Plans call for the program to start near Walmart headquarters in Arkansas early next year\r\nZipline\r\nZipline is partnering with Walmart for a new drone delivery operation in the US, the companies anno… [+1881 chars]',
         sourceID: 5,
         urlToImage:
            'https://cdn.vox-cdn.com/thumbor/A2pSUEQx6OCBpuUoSh6_tm4g9dA=/0x129:1800x1071/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/21878290/Drone_Delivery_Shot_1.jpeg',
         description:
            'Zipline is partnering with Walmart for a new drone delivery operation in the US, the companies announced. Zipline’s launch and release system allows for on-demand delivery in less than an hour, and operating from a Walmart store, can service a 50-mile radius.',
         publishedAt: '2020-09-14T04:01:00Z',
         showOnHomepage: false
      },
      {
         id: 8,
         title: "It's hard to grow vegetables in this mountain town. Then this farmer had an idea - CNN",
         content: null,
         sourceID: 4,
         urlToImage: 'https://cdn.cnn.com/cnnnext/dam/assets/200910220948-vertical-harvest-05-super-tease.jpg',
         description: 'Founded in 2016, Vertical Harvest is a vertical farm in that grows fresh produce for local restaurants and employs disabled workers in Jackson, Wyoming.',
         publishedAt: '2020-09-14T02:19:00Z',
         showOnHomepage: false
      },
      {
         id: 9,
         title: "Nvidia Buying Arm Holdings from SoftBank in Largest Ever Chip Deal - Barron's",
         content:
            'Nvidia\r\n has agreed to buy the U.K.-based chip design house Arm Holdings from \r\n SoftBank Group\r\n for about $40 billion in cash, stock, and future considerations. Its the biggest acquisition in the h… [+8547 chars]',
         sourceID: 3,
         urlToImage: 'https://images.barrons.com/im-189533/social',
         description: '',
         publishedAt: '2020-09-14T00:57:00Z',
         showOnHomepage: true
      },
      {
         id: 10,
         title: 'Passenger removed, Delta flight in Detroit delayed over mask - The Detroit News',
         content:
            'A Delta Air Lines flight from Detroit to Los Angeles had to make a pre-liftoff detour back to the gate when a passenger refused to wear a mask.\r\nDelta Flight 201, scheduled to depart at 8:15 p.m. Sat… [+2444 chars]',
         sourceID: 2,
         urlToImage:
            'https://www.gannett-cdn.com/presto/2020/09/14/PDTN/6c6b1149-f97c-41f8-b542-473619b1bcc7-AP20244723182709.jpg?crop=5279,2970,x0,y268&width=3200&height=1680&fit=bounds',
         description: 'L.A.-bound plane returns to gate, departs 47 minutes late',
         publishedAt: '2020-09-14T00:45:02Z',
         showOnHomepage: false
      },
      {
         id: 11,
         title: 'Asian shares on firm footing as vaccine trials resume - Reuters',
         content:
            'LONDON (Reuters) - World stocks rallied on Monday on hopes for a coronavirus vaccine after AstraZeneca resumed its phase-3 trial, but caution lingered before a host of central bank meetings this week… [+3577 chars]',
         sourceID: 4,
         urlToImage: 'https://static.reuters.com/resources/r/?m=02&d=20200914&t=2&i=1533325326&r=LYNXMPEG8D0P7&w=800',
         description:
            'World stocks rallied on Monday on hopes for a coronavirus vaccine after AstraZeneca resumed its phase-3 trial, but caution lingered before a host of central bank meetings this week.',
         publishedAt: '2020-09-14T00:36:00Z',
         showOnHomepage: true
      },
      {
         id: 12,
         title: 'Nikola Is Collapsing Under The Pressure - Seeking Alpha',
         content:
            "Nikola (NKLA) is establishing itself as one of the most volatile stocks in the market. After surging nearly 40% on news of the Nikola-General Motors (GM) deal, Nikola's stock quickly plunged as a res… [+5625 chars]",
         sourceID: 4,
         urlToImage: 'https://static1.seekingalpha.com/uploads/2020/9/12/32586395-15999574394124677.png',
         description:
            "Recent fraud allegations have placed Nikola under an intense amount of scrutiny. The details behind Nikola's GM deal raises more doubts about Nikola's technology.",
         publishedAt: '2020-09-14T00:28:00Z',
         showOnHomepage: false
      },
      {
         id: 13,
         title: 'How much stimulus check money could you get? Calculate it using this tool - CNET',
         content:
            'The CNET stimulus payment calculator can help you estimate how much money you could get from the IRS if a second check comes to be.\r\nSarah Tew/CNET\r\nIf a second stimulus check gets approved in 2020, … [+3336 chars]',
         sourceID: 5,
         urlToImage:
            'https://cnet1.cbsistatic.com/img/F4ZpHvWRMSHICAPdaVMgaXRigDo=/1200x630/2020/08/04/24605e53-49eb-4e96-b84d-94e3800c90b1/calculate-calculator-amount-of-stimulus-check-2020-cash-money-phone-002.jpg',
         description:
            "Use our calculator to estimate how much you, your family and your dependents could expect to receive with a second stimulus check, or with your first payment if you're still waiting for it to arrive.",
         publishedAt: '2020-09-13T23:46:00Z',
         showOnHomepage: false
      },
      {
         id: 14,
         title: 'Global oil demand may have passed peak, says BP energy report - The Guardian',
         content:
            'BP has called time on the worlds rising demand for fossil fuels after finding that demand for oil may have already reached its peak and faces an unprecedented decades-long decline.\r\nDemand for oil ma… [+4572 chars]',
         sourceID: 3,
         urlToImage:
            'https://i.guim.co.uk/img/media/a5d7127d69b12b5bf7adb02c93cbee7a69180d1e/0_180_3585_2153/master/3585.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=805d67edea7339a276948a05c77dfc9b',
         description: 'Oil will be replaced by clean electricity, BP predicts, as demand may never recover from Covid-19 pandemic',
         publishedAt: '2020-09-13T23:01:00Z',
         showOnHomepage: true
      },
      {
         id: 15,
         title: 'Exxon Used to Be America’s Most Valuable Company. What Happened? - The Wall Street Journal',
         content:
            'It has been a stunning fall from grace for Exxon Mobil Corp.\r\nJust seven years ago, Exxon was the biggest U.S. company by market capitalization. It has since lost roughly 60% of its value, with its m… [+147 chars]',
         sourceID: 1,
         urlToImage: 'https://images.wsj.net/im-230640/social',
         description: 'The oil giant doubled down on oil and gas before the pandemic crushed demand',
         publishedAt: '2020-09-13T22:50:00Z',
         showOnHomepage: false
      },
      {
         id: 16,
         title: 'Tesla Model 3 In-Depth 10,000-Mile Cost-Of-Ownership Analysis - InsideEVs ',
         content:
            "This Tesla Model 3 cost-of-ownership followup just premiered today. If you're in the market for a Model 3, another Tesla vehicle, or any EV for that matter, it's worth your time.\r\nThe Model 3 is Tesl… [+1850 chars]",
         sourceID: 2,
         urlToImage: 'https://cdn.motor1.com/images/mgl/x4Z62/s1/tesla-model-3-10-000-mile-cost.jpg',
         description: "The Model 3 is Tesla's least-expensive model, but it's still not cheap. However, it is priced better than many less compelling EVs, and it's cheap to own.",
         publishedAt: '2020-09-13T22:12:34Z',
         showOnHomepage: true
      },
      {
         id: 17,
         title: "Peeps won't come in Halloween, Christmas shapes this year due to COVID-related production shutdown - USA TODAY",
         content:
            "Peeps, the popular colored marshmallows shaped like baby chicks, won't come in Halloween or Christmas shapes this year due to the COVID-19 pandemic, the company said in a statement to USA TODAY. \r\nPe… [+1313 chars]",
         sourceID: 5,
         urlToImage:
            'https://www.gannett-cdn.com/presto/2020/09/13/USAT/22a46bbd-618b-49bb-935a-a3db6625f966-Screen_Shot_2020-09-13_at_4.37.57_PM.png?crop=737,415,x0,y0&width=737&height=415&format=pjpg&auto=webp',
         description: "Just Born had to temporarily shut down its factories due to the pandemic. That's why there won't be Christmas Peeps.",
         publishedAt: '2020-09-13T21:54:31Z',
         showOnHomepage: true
      },
      {
         id: 18,
         title: 'Price of Gold Fundamental Weekly Forecast - Fed May Not Deliver What Gold Bulls Want to Hear - FX Empire',
         content:
            'Late in the week, gold jumped as the dollar weakened after the European Central Bank kept its policy unchanged and U.S. jobless claims held at high levels, dimming hopes of a quick economic recovery … [+2257 chars]',
         sourceID: 3,
         urlToImage: 'https://responsive.fxempire.com/width/600/webp-lossy-70.q50/_fxempire_/2020/09/GoldDollar-1.jpg',
         description: 'It seems wherever we look we see reasons for higher prices and reasons for lower prices. This is creating a rangebound trade.',
         publishedAt: '2020-09-13T21:32:49Z',
         showOnHomepage: false
      },
      {
         id: 19,
         title: 'The Chart of the Week: EUR/USD in distribution, bears waiting for breakout confirmations - FXStreet',
         content:
            'Note: All information on this page is subject to change. The use of this website constitutes acceptance of our user agreement. Please read our privacy policy and legal disclaimer.\r\nTrading foreign ex… [+1338 chars]',
         sourceID: 5,
         urlToImage: 'https://editorial.fxstreet.com/images/Markets/Currencies/Majors/EURUSD/MoneyEURUSD_2_Large.jpg',
         description: 'EUR/USD is decelerating in a phase of distribution and the following offers a top-down analysis for swing traders. There are a number of steps that th',
         publishedAt: '2020-09-13T21:02:00Z',
         showOnHomepage: false
      },
      {
         id: 20,
         title: 'Pfizer says their vaccine will likely be approved by end of year - One America News Network',
         content:
            'FILE – In this July 27, 2020, file photo, a nurse prepares a shot as a study of a possible COVID-19 vaccine in Binghamton, N.Y. (AP Photo/Hans Pennink, File)\r\nOAN NewsroomUPDATED 1:45 PM PT Sunday, S… [+1124 chars]',
         sourceID: 2,
         urlToImage: null,
         description:
            'Breaking News, Latest News and Current News from OANN.com. Breaking news and video. Latest Current News: U.S., World, Entertainment, Health, Business, Technology, Politics, Sports.',
         publishedAt: '2020-09-13T20:45:01Z',
         showOnHomepage: false
      }
   ]
}

const CATEGORIES = {
   sourceCategory: [
      {
         id: 1,
         name: 'TechCrunch'
      },
      {
         id: 2,
         name: 'Yahoo Entertainment'
      },
      {
         id: 3,
         name: 'autoevolution'
      },
      {
         id: 4,
         name: 'MarketWatch'
      },
      {
         id: 5,
         name: 'The Wall Street Journal'
      }
   ]
}

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

   articles$: Observable<any> = of(NEWS)
   categories$: Observable<any> = of(CATEGORIES)

   constructor(private service: Service) {}

   ngOnInit(): void {
      this.getNews()
   }

   getNews() {
      forkJoin([
         this.articles$.pipe(map((e: any) => e.articles.filter((x: any) => x.showOnHomepage === true))),
         this.categories$.pipe(
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
