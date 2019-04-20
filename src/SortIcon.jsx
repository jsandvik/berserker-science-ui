import React from 'react';

const SortIcon = ({active, descending}) => {
    if (!active) {
        return null;
    } else if (descending === true) {
        return <span className="oi oi-sort-descending" title="sort descending" aria-hidden="true"></span>;
    } else {
        return <span className="oi oi-sort-ascending" title="sort ascending" aria-hidden="true"></span>;
    }
};

export default SortIcon;