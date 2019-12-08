import React from 'react';
import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import columns from './columns';
import Container from "../Container";
import actions from "../actions";


class DrillDetailsContainer extends Container {
    constructor(props) {

        super(props);

        this.state.columns = this.props.columns ? [...this.props.columns] : [...columns];
        this.state.filters = this.state.filters || {};
        this.state.submissions = {
            keys: [],
            rows: []
        };
        this.updateMinDate = this.updateMinDate.bind(this);
        this.updateMinDateFromLocalStorage = this.updateMinDateFromLocalStorage.bind(this);
        
        if (props.dispatch) {
            props.dispatch.on(actions.DATERANGE_PICKLIST_UPDATE, this.updateMinDate);
            props.dispatch.on(actions.DATERANGE_PICKLIST_INIT, this.updateMinDateFromLocalStorage);
        }
    }

    async updateMinDate(newDate) {
        let filters = this.state.filters;
        filters.minDate = this.props.dateMap[newDate];
        await this.setState({submissions: {keys: [], rows: []}, filters});
        this.dataSource();
    }

    // almost the same but need to accomodate the component trying to mount
    async updateMinDateFromLocalStorage(newDate) {
        let filters = this.state.filters;
        filters.minDate = this.props.dateMap[newDate];
        await this.setState({filters, hasInitBeenCalled: true});

        if (this.state.isMounted) {
            this.initDataSource();
        }
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

        let _columns = [...this.props.columns];


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

    // override - need to make sure initDataSource is only called after both the picklist and this component are finished mounting
    componentDidMount() {
        if (!this.props.dispatch || this.state.hasInitBeenCalled) {
            this.initDataSource();
        } else {
            this.setState({isMounted: true});
        }
    }
        
}

export default DrillDetailsContainer;