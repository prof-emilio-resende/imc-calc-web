import ImcDriver from '../drivers/ImcDriver.js';

export default class ImcController {
  constructor() {
    this.imcDriver = new ImcDriver();
  }

  loadTable(onSucceed) {
    this.imcDriver
      .getTable()
      .then(onSucceed)
      .catch(function (err) {
        console.log(err);
        alert(`Sorry, can't load the table. ${err.responseText}`);
      });
  }

  async calculate(person) {
    return await this.imcDriver.calculate(person);
  }
}
