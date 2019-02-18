import React from "react";
import DatePicker from "react-datepicker";
import isAfter from "date-fns/isAfter";
import "react-datepicker/dist/react-datepicker.css";

export default class Calendar extends React.Component {
  constructor(props) {
    const dateTwoWeeksAgo = new Date();
        dateTwoWeeksAgo.setDate(dateTwoWeeksAgo.getDate() - 14);
    super(props);
    this.state = {
      startDate: dateTwoWeeksAgo,
      endDate: new Date()
    };

  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (isAfter(startDate, endDate)) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
  };

  handleChangeStart = startDate => this.handleChange({ startDate });

  handleChangeEnd = endDate => this.handleChange({ endDate });

  render() {
    return (

      <div>
        <h6 className="selectDate">Select Date Range:</h6>
        <br />
        <div className="dateColumns">
          <DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
          />
          <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
          />
        </div>
      </div>
    );
  }
}


// import React, {Component, Fragment} from 'react';
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";


// class Calendar extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           startDate: new Date()
//         };
//         this.handleChange = this.handleChange.bind(this);
//       }

//       handleChange(date) {
//         this.setState({
//           startDate: date
//         });
//       }

//     render() {

//         return (
//             <Fragment>
//                 <DatePicker
//                 selected={this.state.startDate}
//                 selectsStart
//                 startDate={this.state.startDate}
//                 endDate={this.state.endDate}
//                 onChange={this.handleChangeStart}
//             />

//             <DatePicker
//                 selected={this.state.endDate}
//                 selectsEnd
//                 startDate={this.state.startDate}
//                 endDate={this.state.endDate}
//                 onChange={this.handleChangeEnd}
//             />
//             </Fragment>

//         );
//     }
// }

// export default Calendar