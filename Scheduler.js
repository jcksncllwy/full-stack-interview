const isUndefined = require("is-undefined");
const distance = require('geo-distance');
const Heap = require('heap');
const {each} = require('lodash');

module.exports = class Scheduler{
  constructor(patients){
    this.patients = patients
  }

  findAvailablePatientsByLocation(lat, long){
    each(this.patients, (p)=>{
      if(isUndefined(p.score)){
        p.score = 0;
      } else {
        return; // patient has already been scored
      }

      const dist = distance.between(
        {lat,long},
        {lat:p.location.latitude, long: p.location.longitude}
      )

      p.score = p.age;
    })

    return Heap.nlargest(this.patients, 10, (a,b)=>a.score-b.score);
  }
}
