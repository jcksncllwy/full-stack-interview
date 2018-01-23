module.exports = class Scheduler{
  constructor(patients){
    this.patients = patients
  }

  findAvailablePatientsByLocation(lat, long){
    console.log(lat, long)
    return this.patients[0];
  }
}
