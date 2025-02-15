import React from 'react';
import {FixedSizeList as List, ListChildComponentProps} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import './styles.css';


const Row = (listProps: ListChildComponentProps) => {
    return <div className={listProps.index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={{
        ...listProps.style,
        height: '100px',
    }}>
        Row {listProps.index}
    </div>;
};

const TestReactWindow = () => {
    return <List
        className="List"
        height={400}
        itemCount={1000}
        itemSize={35}
        width={400}
    >
        {Row}
    </List>;
};

export default TestReactWindow;

