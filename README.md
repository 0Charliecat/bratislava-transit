# `bratislava-transit`

```javascript
let mhd = require(`bratislava-transit`)
let eMHaDe = new mhd(`toats' real key`)

const main = async () => {
  console.log(eMHaDe.linePDF(525))
  await eMHaDe.stops({name: "Hlavná stanica"}).then(console.log)
  await eMHaDe.vehicle({line: 8}).then(console.log)
}

main()
```

---

A wrapper for Bratislava OpenData API `/mhd/` section

Has `@JSDoc`, with better documentation


> ### Navigation
> 
> -  Getting started! - https://github.com/slovak-cat/bratislava-transit#getting-started
> 
> -  Documentation - https://github.com/slovak-cat/bratislava-transit#documentation



## Getting started!

1. First off, get an API key from Bratislava's OpenData [https://opendata.bratislava.sk/page/openapi](https://opendata.bratislava.sk/page/openapi)
2. Then use `npm i bratislava-transit` and import it, like in example upper on the page (write it to `index.js` file)
3. Use `node index` to test it



## Documentation

> ### `new <BratislavaMHD>(apiKey)` Constructor
> 
> - Params
>    - `apiKey` - String - A API key from Bratislava OpenData

---

> ### async `<BratislavaMHD>.stops(options)` Function
> 
> - Params
>    - `options` - Object - **Optional**,
```json
{
      "stationStopID": 99999,
      "stationID": 999,
      "name": "Umňaukaná",
      "tag": "099999"
}
```
> - Returns - Object - Depends on `options`


---


> ### async `<BratislavaMHD>.vehicle(options)` Function
> 
> - Params
>    - `options` - Object - **Optional,**
```json
{
      "id": "7416", # vehicleNumber
      "line": "98" # lineNumber
}
```
> - Returns - Object - Depends on `options`

---

> ### `<BratislavaMHD>.linePDF(lineNumber, year)` Function
> 
> **Only works with Arriva Bratislava lines**, DPB hasn't published PDFs of lines and ZSSK wants money for that.
> 
> **Isn't an `async` Function**
> 
> - Params
>    - `lineNumber` - Number - **REQUIRED** - Example `525`
>    - `year` - Number - Optional, Defaults to current year, Value must be between 2021-2031
> - Returns - String - a link to PDF from Arriva Bratislava Servers
