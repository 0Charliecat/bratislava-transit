const request = require('request'),
      serverUrl = `http://opendata.bratislava.sk/api/mhd/`,
      pckV = `1.0.1`;

let userAgent = 'nodejs_bratislava-transit/' + pckV

// https://opendata.bratislava.sk/dataset/insight/17112

class BratislavaMHD {
  /**
   * @param  {String} apiKey **MUST be a valid Bratislava OpenData API key**, you can get one from 
   * @documenatation
   * @example
   * let mhd = require(`bratislava-transit`)
   * let eMHaDe = new mhd(`toats' real key`) // <<<==== that is this
   * 
   * const main = async () => {
   *  console.log(eMHaDe.linePDF(525))
   *  await eMHaDe.stops({name: "Hlavná stanica"}).then(console.log)
   *  await eMHaDe.vehicle({line: 8}).then(console.log)
   * }
   * 
   * main()
   */
  constructor(apiKey, options = {}) {
    apiKey = apiKey.replace(`\n`, ``)
   const openKEY = apiKey
    if (typeof(apiKey) === "string"){
      this.key = apiKey;
    }
    if (options.hasOwnProperty('userAgent')) {
      userAgent = options.userAgent
    }
    //console.log(this)
  }
  
  // ==== AsyncRequest ====
  asyncRequest(url) {
    let keyIt = this.key
        return new Promise (function (resolve, reject) {
        var options = {
            url: serverUrl + url,
            headers: {
                'User-Agent': userAgent,
                'Key': keyIt
            }
        }
        request(options, function (err, response, body) {
          //console.log(err)
            if (err) reject(err);
            resolve(JSON.parse(body))
            });
       })
  }
  
  // ==== all of others ===
  
  /**
   * @param  {{id: string, line: string}} options **Optional**
   */
  async vehicle(options) {
   let responce = await this.asyncRequest(`vehicle`)
   if (typeof(options) === `object`) {
     if (options.hasOwnProperty(`id`)) {
       responce = responce.filter(vehicle => vehicle.vehicleNumber === options.id)
     } 
     if (options.hasOwnProperty(`line`)) {
       responce = responce.filter(vehicle => vehicle.lineNumber === options.line)
     }
   }
   
   return responce
  }
  
  /**
   * @param  {{stationStopID: number, stationID: number, name: string, tag: string}} options **Optional**
   * @returns {Object} If `options.stationStopID` was specified, returns `stationstop/{stationStopID}` Object, else returns `stationstop` Object
   */
  async stops(options) {
    options = (typeof(options) === `object`) ? options : {}
    const schema = {
      stationStopID: 99999,
      stationID: 999,
      name: `Umňaukaná`,
      tag: `099999`
    }

    let ars = (options.hasOwnProperty(`stationStopID`)) ? `/${options.stationStopID}` : ``
    
    let responce = await this.asyncRequest(`stationstop${ars}`)

    if (ars.length === 0 && Array.isArray(responce)) {
      if (options.hasOwnProperty(`stationID`)) {
        responce = responce.filter(stat => stat.stationpId === options.stationID)
      }
      if (options.hasOwnProperty(`name`)) {
        responce = responce.filter(stat => stat.name === options.name)
      }
      if (options.hasOwnProperty(`tag`)) {
        responce = responce.filter(stat => stat.tag === options.tag)
      }
    }
    
    return responce
  }
  
  /**
   * @param  {Number} lineNumber **Optional**, Line number in IDS BK 
   * @param  {Number} year **Optional**, Year, defaults to current year, MUST be between years that Arriva operates in IDS BK.
   * @returns {String} If PDF found returns PDF url, else returns `Not Supported`
   * 
   * **ONLY Arriva Bratislava**, DPB hasn't been implemented yet. ZSSK is questionable.
   */
  linePDF(lineNumber, year) {
    let thisYear = (typeof(year) === `number` && String(year).length === 4 && year > 2021 && 2031 > year) ? year : new Date().getFullYear();
      if (lineNumber > 200 && 800 > lineNumber) {
        return `https://arriva.sk/files/ba/cp/${thisYear}/${lineNumber}.pdf`
      } else {
        return `Not Supported`
      }
  }

}

// ====================

module.exports = BratislavaMHD
 