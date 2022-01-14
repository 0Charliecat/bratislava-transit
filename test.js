let mhd = require(`./index.js`)
let eMHaDe = new mhd(`toats' real key`)

const main = async () => {
  console.log(eMHaDe.linePDF(525))
  await eMHaDe.stops({name: "Hlavná stanica"}).then(console.log)
  await eMHaDe.vehicle({line: 9}).then(console.log)
}

main()