// @flow
import * as React from 'react';
import ReactDOM from "react-dom";


// Types Flow
type PropsPortal = {
    children: React.Node,
};


const Portal = (props: PropsPortal) => {
    const modalWindow = document.getElementById('modalWindow');
    if (modalWindow !== null) {
        return ReactDOM.createPortal(props.children, modalWindow)
    }
};

export default Portal;