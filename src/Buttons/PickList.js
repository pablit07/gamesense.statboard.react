import React from "react";
import DatePicker from "react-datepicker/es";
import isAfter from "date-fns/isAfter";
import "react-datepicker/dist/react-datepicker.css";

export default class PickList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: window.localStorage.getItem('statboard-picklist.' + this.props.name) || props.selectedValue
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    window.localStorage.setItem('statboard-picklist.' + this.props.name, this.state.active);
    if (this.props.onLoad) this.props.onLoad(this.state.active);
  }

  handleChange = (event) => {
    let active = event.target.value;

    this.setState({active});

    window.localStorage.setItem('statboard-picklist.' + this.props.name, active);

    if (this.props.onChange) this.props.onChange(active);
  };

  render() {

    let options = this.props.options.map( o => {
      return (<option name={o.key} value={o.value}>{o.key}</option> );
    });

    return (
      <select onChange={this.handleChange} value={this.state.active}>
        {options}
      </select>
    );
  }
}