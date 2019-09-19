const fuzzy = (filter, row) => {
    const id = filter.pivotId || filter.id;
    const content = row[id];
    if (typeof content !== 'undefined') {

        if (filter.value.length < 2) {
            // filter by text in the table or if it's a object, filter by key
            if (typeof content === 'object' && content !== null && content.key) {
                return String(content.key).toLowerCase().startsWith(filter.value.toLowerCase());
            } else {
                return String(content).toLowerCase().startsWith(filter.value.toLowerCase());
            }
        } else {
            // filter by text in the table or if it's a object, filter by key
            if (typeof content === 'object' && content !== null && content.key) {
                return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
            } else {
                return String(content).toLowerCase().includes(filter.value.toLowerCase());
            }
        }

    }

    return true;
};

export default fuzzy;