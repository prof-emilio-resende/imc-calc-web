import ViewComponent from '../framework/ViewComponent.js';
import ImcController from '../controllers/ImcController.js';
import Person from '../domain/Person.js';

export default class ImcView extends ViewComponent {
  /**
   * Guard state control and renderization process of the IMC view
   */
  constructor() {
    super('ImcView');
    this.controller = new ImcController();
    this.state = {
      person: undefined,
    };
  }

  /**
   * This method represent the HTML produced by this component
   */
  render() {
    if (this.state.person) {
      const { imc, imcDescription } = this.state.person;
      //this is to explain lexical scope
      return `Seu IMC &eacute; <span id="imc">${imc}</span> => <strong>${imcDescription}</strong>`;
    }
    return null;
  }

  async stateUpdated() {
    if (this.state.person) {
      const objPerson = await this.controller.calculate(
        this.state.person.toObject()
      );

      const newPerson = Object.assign(Object.create(Person), objPerson);

      this.state = {
        ...this.state,
        person: newPerson,
      };

      console.log(this.state);
    } else {
      console.warn("nothing to update on state, person is empty");
    }
  }
}
