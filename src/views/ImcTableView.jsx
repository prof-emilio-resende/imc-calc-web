import React from 'react';

import ImcController from '../controllers/ImcController.js';

export default class ImcTableView extends React.Component {
  /**
   * Guard state control and renderization process of the IMC view
   */
  constructor() {
    super('#imc-table');
    this.imcController = new ImcController();
    this.state = {
      tableData: []
    };
  }

  componentDidMount() {
    this.imcController.loadTable((tblObj) => {
      this.setState({tableData: tblObj});
    });
  }

  /**
   * This method represent the HTML produced by this component
   */
  render() {
    //this is to explain lexical scope
    return (<table id="unique"><tbody id="body">
      {  Object.keys(this.state.tableData)
        .sort()
        .map((k) =>
          <tr id={k}>
            <td> {k} </td>
            <td> {this.state.tableData[k]} </td>
          </tr>
        )
      }
    </tbody></table>);
  }
}
