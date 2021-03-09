import React from 'react';

import ViewComponent from '../framework/ViewComponent.js';
import ImcController from '../controllers/ImcController.js';

export default class ImcTableView extends ViewComponent {
  /**
   * Guard state control and renderization process of the IMC view
   */
  constructor() {
    super('ImcTableView');
    this.imcController = new ImcController();
  }

  /**
   * This method is meant to be triggered right after the page completes the load proccess
   */
  onLoad() {
    this.imcController.loadTable((tblObj) => {
      this.state = tblObj
      this.paint();
    });
  }

  /**
   * This method represent the HTML produced by this component
   */
  render() {
    //this is to explain lexical scope
    return (<table>
      {  Object.keys(this.state)
        .sort()
        .map((k) =>
          <tr>
            <td> {k} </td>
            <td> {this.state[k]} </td>
          </tr>
          
        )
      }
    </table>);
  }
}
