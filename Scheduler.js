const isUndefined = require("is-undefined");
const distance = require('geo-distance');
const Heap = require('heap');
const {each} = require('lodash');

module.exports = class Scheduler{
  constructor(patients){
    this.patients = patients
  }

  findAvailablePatientsByLocation(lat, long){

    //Assign scores to each patient
    //Scores range from 0 to 10
    each(this.patients, (p)=>{
      if(isUndefined(p.score)){
        p.score = 0;
      } else {
        return; // patient has already been scored
      }

      //1 point if patient is within 5km
      const dist = distance.between(
        {lat,long},
        {lat:p.location.latitude, long: p.location.longitude}
      )
      if(dist<distance('5km')){
          p.score+=1;
      }

      //1 point if patient is in an age range
      if(18<p.age<60){
        p.score+=1;
      }

      //3 points for patients with high acceptance
      if(p.acceptedOffers>20){
        p.score+=3;
      }

      //3 points for patients with low cancelations
      if(p.canceledOffers<10){
        p.score+=3;
      }

      //2 points for patients with quick response times
      if(p.averageReplyTime<1000){
        p.score+=2;
      }

    })

    return Heap.nlargest(this.patients, 10, (a,b)=>a.score-b.score);
  }
}
