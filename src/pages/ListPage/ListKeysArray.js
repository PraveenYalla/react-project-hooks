import React, { useRef } from 'react';
import { Input, Label, Button } from 'reactstrap';

const ListKeysArray = props => {
    const { KeysList } = props;
    // const ArrList = Object.keys(KeysArrayList);
    const keyInput = useRef("")
    // console.log(KeysList);
    const getKeys = () => {
        console.log(keyInput);
        let keyVal = keyInput.current.value;
        props.dispatchKeysArrayList(keyVal);
        // updatedUsersList(KeysArrayList[keyVal]);
        // // setUpdatedList(keyList);
        // console.log(KeysArray);
    }
    return (
        <div className="row gx-3 gy-2 align-items-center">
            <div className="col-12">
                <p>Available Arrays</p>
                {
                    (KeysList.length > 0 && KeysList) ?
                        KeysList.map((item, i) => (
                            <div key={i}>
                                <input ref={keyInput} type="hidden" value={item} />
                                <button className="btn btn-primary waves-effect waves-light btn btn-primary" onClick={getKeys} >{item}</button>
                            </div>
                        )) : ""
                }
            </div>
        </div>
    )
}

export default ListKeysArray;