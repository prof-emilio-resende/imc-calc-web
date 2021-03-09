import React from 'react';

import ImcController from '../controllers/ImcController.js';
import Person from '../domain/Person.js';

export default class ImcView extends React.Component {
  /**
   * Guard state control and renderization process of the IMC view
   */
  constructor() {
    super('ImcView');
    this.controller = new ImcController();
    this.state = {
      person: {}
    }
  }

  /**
   * This method represent the HTML produced by this component
   */
  render() {
    if (this.state.person) {
      const { imc, imcDescription } = this.state.person;
      //this is to explain lexical scope
      return (<div className={this.props.className}>Seu IMC &eacute; <span id="imc">{imc}</span> ==> <strong>{imcDescription}</strong></div>);
    }

    return null;
  }


  async componentDidUpdate() {
    if ((this.props.person && !this.state.person) ||
      (
        this.props.person && this.state.person &&
        (this.props.person.height !== this.state.person.height ||
        this.props.person.weight !== this.state.person.weight)
      )) {
      const objPerson = await this.controller.calculate(
        this.props.person.toObject()
      );

      const newPerson = Object.assign(Object.create(Person), objPerson);

      this.setState({person: newPerson});
    } else {
      console.warn("nothing to update on state, person is empty");
    }
  }
}
