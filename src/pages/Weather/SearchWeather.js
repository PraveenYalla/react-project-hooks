import React, { useRef } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';


const SearchWeather = props => {

    const query = useRef('')

    const submitQuery = () => {
        let q = query.current.value;
        if(q !== ""){
            props.onSubmit(q);
            query.current.value = ""
        }
    }


    return (
        <React.Fragment>
            <div className="input-group">
                <input type="text" ref={query} className="form-control"></input>
                <button type="button" onClick={ submitQuery } className="btn btn-primary">Search</button>
            </div>
        </React.Fragment>
    )
}


export default SearchWeather;