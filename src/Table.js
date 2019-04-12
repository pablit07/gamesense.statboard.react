import checkboxHOC from "react-table/lib/hoc/selectTable";
import ReactTable from "react-table";
import React, {Component} from 'react';
import toggleHeaderHOC from "./DrillUsage/ToggleHeader";

const CheckboxTable = toggleHeaderHOC(checkboxHOC(ReactTable));

class Table extends Component {

    constructor() {
        super(...arguments);

        this.state = {
            selectAll: false
        }
    }

    render() {

        const {
            columns, submissions, isLoading, buttons
        } = this.props;

        const {toggleSelection, toggleAll} = {

            toggleSelection: (key, shift, row) => {
                /*
                  Implementation of how to manage the selection state is up to the developer.
                  This implementation uses an array stored in the component state.
                  Other implementations could use object keys, a Javascript Set, or Redux... etc.
                */
                // start off with the existing state
                let selection = [...this.state.selection];
                const keyIndex = selection.indexOf(key);
                // check to see if the key exists
                if (keyIndex >= 0) {
                    // it does exist so we will remove it using destructing
                    selection = [
                        ...selection.slice(0, keyIndex),
                        ...selection.slice(keyIndex + 1)
                    ];
                } else {
                    // it does not exist so add it
                    selection.push(key);
                }
                // update the state
                this.setState({selection});
            },

            toggleAll: () => {
                /*
                  'toggleAll' is a tricky concept with any filterable table
                  do you just select ALL the records that are in your data?
                  OR
                  do you only select ALL the records that are in the current filtered data?

                  The latter makes more sense because 'selection' is a visual thing for the user.
                  This is especially true if you are going to implement a set of external functions
                  that act on the selected information (you would not want to DELETE the wrong thing!).

                  So, to that end, access to the internals of ReactTable are required to get what is
                  currently visible in the table (either on the current page or any other page).

                  The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
                  ReactTable and then get the internal state and the 'sortedData'.
                  That can then be iterrated to get all the currently visible records and set
                  the selection state.
                */
                const selectAll = !this.state.selectAll;
                const selection = [];
                if (selectAll) {
                    // we need to get at the internals of ReactTable
                    const wrappedInstance = this.checkboxTable.getWrappedInstance();
                    // the 'sortedData' property contains the currently accessible records based on the filter and sort
                    const currentRecords = wrappedInstance.getResolvedState().sortedData;
                    // we just push all the IDs onto the selection array
                    currentRecords.forEach(item => {
                        selection.push(item.id_submission);
                    });
                }
                this.setState({selectAll, selection});
            },

        };
        const {selectAll} = this.state;
        const isSelected = (key) => {
            return this.state.selection.includes(key);
        };

        const checkboxProps = {
            selectAll,
            isSelected,
            toggleSelection,
            toggleAll,
            selectType: "checkbox",
            // getTdProps: (r, s) => {
            //   const selected = this.isSelected(r.id_submission);
            //   return {
            //     style: {
            //       backgroundColor: selected ? "lightgreen" : "inherit"
            //       // color: selected ? 'white' : 'inherit',
            //     }
            //   };
            // }
        };

        return (<CheckboxTable
            keyField='id_submission'
            ref={r => (this.checkboxTable = r)}
            className="-striped -highlight"
            columns={columns}
            data={submissions}
            filterable
            defaultPageSize={25}
            noDataText={(isLoading ? "...Please Wait" : "No Data To Display")}
            {...checkboxProps}
        >


            {(state, filteredData, _) => {
                return (
                    <div id="actionButtons">

                        {buttons}

                        {/* React-Table */}
                        {filteredData()}

                    </div>
                );
            }}

        </CheckboxTable>);
    };
}

export { Table };