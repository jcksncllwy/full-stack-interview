var distance = require('geo-distance');
var {each} = require('lodash');

module.exports = class Scheduler{
  constructor(patients){
    this.patients = patients
  }

  findAvailablePatientsByLocation(lat, long){
    let results = [];

    each(this.patients, (p)=>{
      const dist = distance.between(
        {lat,long},
        {lat:p.location.latitude, long: p.location.longitude}
      )
      if(dist<distance('1 km')){
        results.push(p);
      }
    })

    return results;
  }
}
