import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

@Injectable({
   providedIn: 'root'
})
export class Service {
   constructor(private _Http: HttpClient) {}

   /**
    * Http Get Request
    * @param url String
    */
   get<T>(url: string, params?: {}): Observable<T> {
      return this._Http.get<T>(url, { params })
   }

   /**
    * Http Post Request
    * @param url String
    * @param body Object
    * @returns Observebles
    */
   post<T>(url: string, body?: {}): Observable<T> {
      return this._Http.post<T>(url, body)
   }

   /**
    * Http delete request
    * @param url
    * @returns Observable
    */
   delete<T>(url: string): Observable<T> {
      return this._Http.delete<T>(url)
   }

   /**
    * Http put request
    * @param url
    * @param body
    * @returns Observable
    */
   put<T>(url: string, body?: {}): Observable<T> {
      return this._Http.put<T>(url, body)
   }
}
