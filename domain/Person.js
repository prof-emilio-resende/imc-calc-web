class Person {
  constructor(theHeight, theWeight) {
    this.height = theHeight;
    this.weight = theWeight;
    this.imc = null;
  }

  isValid() {
    return this.height && this.weight;
  }

  get height() {
    return this._height;
  }

  get weight() {
    return this._weight;
  }

  set height(theHeight) {
    console.log('setting height');
    this._height = theHeight;
  }

  set weight(theWeight) {
    console.log('setting weight');
    this._weight = theWeight;
  }

  get imc() {
    return this._imc;
  }

  set imc(theImc)  {
    console.log('setting imc');
    this._imc = theImc;
  }

  toObject() {
    return {
      height: this._height,
      weight: this._weight,
      imc: this._imc
    };
  }
}
