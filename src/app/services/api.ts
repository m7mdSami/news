export const APIs = (param?: { [x: string]: any }) => {
   const BASE_URL: string = `https://api.npoint.io`

   const API = {
      newsCategoryListing: `${BASE_URL}/c138bb84dc0b94ec5a18`,
      newsListing: `${BASE_URL}/e2534d5412765bf36702`
   }

   return API
}
