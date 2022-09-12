import React, { useRef, useState } from 'react';
import { Input, Label, Button } from 'reactstrap';

const ListKeysArray = React.memo((props) => {
    const { KeysList } = props;
    // const ArrList = Object.keys(KeysArrayList);
    const keyInput = useRef("")
    const [selectArrKey, setselectArrKey] = useState();

    console.log("called keysarray")
    const getKeys = (item) => {
        console.log(item);
        // console.log(KeysList);
        // // temp = item;


        // let _thisItem = KeysList[KeysList.indexOf(item)];

        // if(_thisItem.name == item.name && !_thisItem['selected']){
        //     _thisItem['selected']  = true
        //     props.dispatchKeysArrayList(item)
        // }else if( _thisItem.name !== item.name && _thisItem['selected']){
        //     _thisItem['selected']  = false
        // }

        props.dispatchKeysArrayList(item)

        // console.log(item);
        // if(_thisItem['selected']){
        //     props.dispatchKeysArrayList(item)
        // }


        // KeysList.map(res => {
        //     if (res.name === cur.name) {
        //         res.checked = !res.checked;
        //     }
        // })

        //(KeysList.indexOf(item) !== -1) ? props.dispatchKeysArrayList(item) : props.dispatchKeysArrayList(item)
        // props.dispatchKeysArrayList(item)
        // props.dispatchKeysArrayList(item);
        // if (!temp) {
        //     props.dispatchKeysArrayList(item);
        // }else{
        //     let curItem = (temp !== item) ? item : temp;
        //     props.dispatchKeysArrayList(curItem);
        // }
        // let curItem = (temp !== item) ? item : temp;
        // console.log(temp);
        // props.dispatchKeysArrayList(curItem);
        // temp = item;
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
                            <span key={i}>
                                {/* <input ref={keyInput} type="hidden" value={item} /> */}
                                <button className="btn btn-primary waves-effect waves-light btn btn-primary" onClick={() => getKeys(item)} >{item.name}</button>
                            </span>
                        )) : ""
                }
            </div>
        </div>
    )
})

export default ListKeysArray;