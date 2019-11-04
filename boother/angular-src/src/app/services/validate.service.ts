import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.firstName == undefined || user.lastName == undefined || user.email == undefined || user.phone == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateBooth(booth) {
    // if (booth.bNr == undefined || booth.rentedFrom == undefined || booth.rentedTo == undefined || booth.renter == undefined) {
    if (booth.bNr == undefined) {
      return false;
    } else {
      return true;
    }
  }
  validateBoothUpdate(booth) {
    // if (booth.rented == undefined || booth.rentedFrom == undefined || booth.rentedTo == undefined || booth.renter == undefined) {
    // if (booth.rented == undefined || booth.rentedFrom == undefined || booth.rentedTo == undefined) {
    if (booth.rented == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
  }
  validatePhone(phone) {
    const re = /^0\d+/;
    return re.test(phone);
  }
  validateDate(date) {
    const re = /(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/;
    return re.test(date);
  }

}
