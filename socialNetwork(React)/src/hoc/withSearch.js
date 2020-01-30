import React, {useState} from 'react';

const withSearch = (Component) => {
    return (props) => {

        const [valueSearch, setValueSearch] = useState("");

        const onChangeSearch = (e) => {
            setValueSearch(e.target.value)
        };

        const resultSearch = props.listForSearch.filter(item => item.fullName.toLowerCase().indexOf(valueSearch) >= 0);

        return (
            <div>
                <input type="text" placeholder="Search" value={valueSearch} onChange={onChangeSearch} />
                <Component {...props} listForSearch={resultSearch} />
            </div>

        )
    }
};

export default withSearch;