import ProxyPolyfillBuilder from "proxy-polyfill/src/proxy";

import React from "react";
import ReactDOM from "react-dom";

import ImcTableView from "./views/ImcTableView.jsx";
import ImcView from "./views/ImcView.jsx";
import Person from "./domain/Person";

import "./index.scss";

// polyfill Proxy in the whole app
window.Proxy = ProxyPolyfillBuilder();

function initialize() {
  window.onload = function () {
    ReactDOM.render(<App />, document.getElementById("app"));
  };
}

class App extends React.Component {
  constructor() {
    super();

    const personObserved = this.observe(new Person());

    this.state = {
      personObserved: personObserved,
      person: {},
    };
  }

  /**
   * Observe an instance of any object ... if any property changes and the object state (through obj.isValid)
   * is valid, the view will be updated ( through udpate method )
   * @param {Object} obj
   */
  observe(obj) {
    const self = this;
    if (obj) {
      return new Proxy(obj, {
        set(target, prop, value, receiver) {
          const updated = Reflect.set(target, prop, value);
          console.log(`updated ${updated}`);
          if (target.isValid()) {
            console.log("triggering update to the view");
            self.setState({ person: target });
          } else {
            console.log("object not valid yet, skiping update on view...");
          }

          return true;
        },
      });
    }

    return obj;
  }

  btnAction() {
    console.log("triggering btnAction ...");
    console.log(this);

    const heightElem = document.querySelector("#altura");
    const weightElem = document.querySelector("#peso");

    if (!heightElem) throw Error("height is required field!");
    if (!weightElem) throw Error("weight is required field!");

    const { personObserved } = this.state;
    personObserved.height = heightElem.value;
    personObserved.weight = weightElem.value;
  }

  render() {
    return (
      <>
        <div className="data">
          <div className="form">
            <div className="row">
              <ImcTableView id="imc-table" />
            </div>
            <hr />
            <div className="row">
              <label>Altura</label>
              <input id="altura" placeholder="0.00" />
            </div>
            <div className="row">
              <label>Peso</label>
              <input id="peso" placeholder="0.00" />
            </div>
            <button
              type="button"
              className="action"
              onClick={this.btnAction.bind(this)}
            >
              Calcular
            </button>
          </div>
        </div>
        <hr />
        <ImcView person={this.state.person} className="data" />
      </>
    );
  }
}

initialize();
