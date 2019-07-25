import React from 'react';
import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import columns from './columns';
import Container from "../Container";


class DrillDetailsContainer extends Container {
    constructor(props) {

        super(props);

        const now = new Date();
        const dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);

        this.state.columns = this.props.columns ? [...this.props.columns] : [...columns];
        this.state.filters = this.state.filters || {};
        this.state.filters.minDate = dateOneMonthAgo;
        this.state.filters.maxDate = now;
        this.state.submissions = {
            keys: [],
            rows: []
        };
    }

    getRoutingKey() {
        return 'calc.drill.usageDetail';
    }

    mapStateToProps(state) {

        let defaultProps = {
            buttons: [],
            defaultPageSize: (this.props.defaultPageSize || 25),
            updateSelection: selection => this.setState({selection}),
            hideCheckboxes: this.props.hideCheckboxes
        };

        let _columns = [...state.columns];

        state.submissions.keys.sort().forEach(pt => {
            _columns.push({
                Header: '% ' + pt,
                accessor: "pitchType_" + pt,
                style: {
                    textAlign: 'center'
                },
                filterable: false,
                width: 100,
                maxWidth: 100,
                minWidth: 100,
                Cell: props => {
                    let perc = props.original['pitchType_' + pt];
                    let className = perc > 75 ? 'green' :
                        perc > 50 ? 'blue' :
                            perc > 25 ? 'orange' :
                                perc > 0 ? 'red' : '';
                    return (<div className={className}>{perc}</div>)
                }
            });
        });

        return {
            ...state,
            ...defaultProps,
            submissions: state.submissions.rows,
            columns: _columns
        };
    }
}

export default DrillDetailsContainer;