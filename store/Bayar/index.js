import {observable, decorate} from 'mobx';

export class Bayar {
  printData = [];
  constructor(rooStore) {
    this.rooStore = rooStore;
  }

  bayar(data) {
    console.log(data)
      this.printData = data;
  }

}

decorate(Bayar, {});
