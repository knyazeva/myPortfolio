import React, {useState} from 'react';

const withPrompt = (Component) => {
    return (props) => {

        const [activePrompt, setActivePrompt] = useState(false);

        const onMouseOver = () => {setActivePrompt(true)};
        const onMouseOut = () => {setActivePrompt(false)};

        return (
            <div className="prompt" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                <span className={activePrompt ? "active" : ""}>{props.textPrompt}</span>
                <Component {...props} />
            </div>
        )
    }
};

export default withPrompt;