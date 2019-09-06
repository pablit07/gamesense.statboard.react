import React from 'react';


const defaultToggleButtonComponent = ({ filter, onChange, column, toggle, instance }) => {
    const style = {
        marginLeft: '0px',
        marginTop: '-5px',
        marginBottom: '-8px',
        float: 'left',
        cursor: 'pointer',
        fontSize: '80%'
    };

    let toggles = toggle.map(({label, value}) => {

        // SOMEWHAT COPIED FROM REACT TABLES - FilterColumn
        let onClick = function() {
            let original_filterMethod = column.filterMethod;

            let condition = (value === "*") ? x => x !== '' : (value === '~') ? x => x === '' :  x => x === value;
            column.filterMethod = (filter, row) => {
                const id = filter.pivotId || filter.id;
                return condition(String(row[id]));
            };
            let wrappedInstance = this.getWrappedInstance();
            const { filtered } = wrappedInstance.getResolvedState();
            const { onFilteredChange } = wrappedInstance.props;

            // Remove old filter first if it exists
            const newFiltering = (filtered || []).filter(x => x.id !== column.id);

            newFiltering.push({
                id: column.id,
                value,
                isToggle: true
            });

            wrappedInstance.setStateWithData(
                {
                    filtered: newFiltering,
                },
                () => onFilteredChange && onFilteredChange(newFiltering, column, value)
            );

            column.filterMethod = original_filterMethod;
        };

        return (<label style={{display:"block",color:"white"}} key={label}>
            <input type="radio"
                   name={("filter-"+column.id)}
                   onChange={onClick.bind(instance)}
                   checked={instance.getWrappedInstance() && instance.getWrappedInstance().state.filtered.find(x => x.id === column.id && x.value === value && x.isToggle)}/>
            {label}
        </label>);
    });

    return (<div>
                <div style={style}>
                    {toggles}
                </div>
                <div>

                    <input
                    type="text"
                    style={{
                        width: '60%',
                    }}
                    placeholder={column.Placeholder}
                    value={filter ? filter.value : ''}
                    onChange={event => onChange(event.target.value)}
                    />
                </div>
            </div>
    );
}

/*
from methods.js-

const filterMethod = column.filterMethod || defaultFilterMethod

          // If 'filterAll' is set to true, pass the entire dataset to the filter method
          if (column.filterAll) {
            return filterMethod(nextFilter, filteredSoFar, column)
          }
          return filteredSoFar.filter(row => filterMethod(nextFilter, row, column))
 */

export default ReactTable => {
    const wrapper = class RTToggleHeader extends React.Component {
        constructor(props, context) {
            super(props, context)

            this.state = {
                folded: props.onFoldChange ? undefined : {},
                resized: props.resized || [],
            }
        }

        // this is so we can expose the underlying ReactTable.
        getWrappedInstance = () => {
            if (!this.wrappedInstance) {
                console.warn('RTToggleHeader - No wrapped instance');
                return;
            }
            if (this.wrappedInstance.getWrappedInstance) return this.wrappedInstance.getWrappedInstance()
            return this.wrappedInstance
        }

        getCopiedKey = key => {
            const { foldableOriginalKey } = this.props
            return `${foldableOriginalKey}${key}`
        }

        copyOriginals = column => {
            const { FoldedColumn } = this.props

            // Stop copy if the column already copied
            if (column.original_Header) return

            Object.keys(FoldedColumn).forEach(k => {
                const copiedKey = this.getCopiedKey(k)

                if (k === 'Cell') column[copiedKey] = column[k] ? column[k] : c => c.value
                else column[copiedKey] = column[k]
            })

            // Copy sub Columns
            if (column.columns && !column.original_Columns) column.original_Columns = column.columns

            // Copy Header
            if (!column.original_Header) column.original_Header = column.Header
        }

        restoreToOriginal = column => {
            const { FoldedColumn } = this.props

            Object.keys(FoldedColumn).forEach(k => {
                // ignore header as handling by foldableHeaderRender
                if (k === 'Header') return

                const copiedKey = this.getCopiedKey(k)
                column[k] = column[copiedKey]
            })

            if (column.columns && column.original_Columns) column.columns = column.original_Columns
        }


        toggleFilterRender = ({ filter, onChange, column, toggle, instance }) => {
            return React.createElement(defaultToggleButtonComponent, { filter, onChange, column, toggle, instance });
        };


        applyToggleHeaderForColumns = columns => columns.map((col, index) => {
            if (!col.toggle) return col;

            col.Filter = ({filter, onChange, column}) => this.toggleFilterRender({
                filter,
                onChange,
                column,
                toggle: col.toggle,
                instance: this
            });

            return col;
        });


        render() {
            const {
                columns: originalCols,
                ...rest
            } = this.props;
            const columns = this.applyToggleHeaderForColumns([...originalCols]);

            const extra = {
                columns,
            };

            return <ReactTable {...rest} {...extra} ref={r => (this.wrappedInstance = r)} />
        }
    }

    wrapper.displayName = 'RTToggleHeader';

    return wrapper
}