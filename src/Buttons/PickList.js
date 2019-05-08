import React from "react";
import DatePicker from "react-datepicker/es";
import isAfter from "date-fns/isAfter";
import "react-datepicker/dist/react-datepicker.css";

export default class PickList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.selectedValue
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange = (event) => {
    let active = event.target.value;

    this.setState({active});

    if (this.props.onChange) this.props.onChange(active);
  };

  render() {

    let options = this.props.options.map( o => {
      return (<option name={o.key} value={o.value} selected={o.value === this.state.active}>{o.key}</option> );
    });

    return (
      <select onChange={this.handleChange}>
        {options}
      </select>
    );
  }
}