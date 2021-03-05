import ImcTableView from './views/ImcTableView.js';
import ImcView from './views/ImcView.js';
import Person from './domain/Person.js';

(function() {
  const imcTableView = new ImcTableView();
  const imcView = new ImcView();
  const person = imcView.observe(new Person());

  function calculateImc(evt) {
    const heightElem = document.querySelector("#altura");
    const weightElem = document.querySelector("#peso");

    if(!heightElem) throw Error("height is required field!");
    if(!weightElem) throw Error("weight is required field!");

    person.height = heightElem.value;
    person.weight = weightElem.value;
  }

  window.onload = function () {
    const btn = document.querySelector(".data .form button");
    btn.addEventListener('click', calculateImc);

    imcTableView.onLoad();
    imcView.onLoad();
  };
})();
