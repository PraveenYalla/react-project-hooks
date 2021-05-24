import React, { useRef, useState, useEffect } from 'react';
import { Input, Label, Button } from 'reactstrap';
import { useSelector } from 'react-redux';

const ListKeys = props => {
    const { objKeysList, setSelectedObjKeys, selectedObjKeys, setUpdatedFinalResults } = props;
    const [arrKeys, setArrKeys] = useState(objKeysList)
    const [selectedList, setSelectedList] = useState([])

    let updateobjKeysList = []

    // function getList(list) {
    //     if (list !== undefined) {
    //         let updated = []
    //         for (let i = 0; i < objKeysList.length; i++) {
    //             objKeysList[i].checked = false;
    //             for (let j = 0; j < list.length; j++) {
    //                 if (list[j] === objKeysList[i].name) {
    //                     objKeysList[i].checked = true;
    //                 }
    //             }
    //             updated.push(objKeysList[i]);
    //         }
    //         updateobjKeysList = updated;
    //     }
    // }

    // getList(selectedObjKeys);

    const onChecked = (e, cur) => {




        arrKeys.map(res => {
            if (res.name === cur.name) {
                res.checked = !res.checked;
            }
        })


        console.log(selectedList.indexOf(cur) === -1);
        if(selectedList){
            if (selectedList.indexOf(cur) !== -1) {
                selectedList.splice(selectedList.indexOf(cur), 1)
            } else {
                selectedList.push(cur);
            }
        }


        setArrKeys([...arrKeys]);
        setSelectedList(selectedList);
        // setSelectedList(getList);

        // let checkedVal = e.target.value;
        // if (e.target.checked && (selectedList.indexOf(res) == -1)) {
        //     selectedList.push(res);
        // } else {
        //     e.target.checked = false;    
        //     selectedList.splice(selectedList.indexOf(res), 1);
        // }
        // console.log(selectedList);
        // getList(selectedList)
        // setSelectedObjKeys(selectedList)
        // setSelectedObjKeys(selectedList);
        // setSelectedObjKeys(selectedObjKeys);
    }

    const submitSelectedList = () => {

        setUpdatedFinalResults(selectedList);
        setSelectedObjKeys(selectedList);
    }

    return (
        <div className="row gx-3 gy-2 align-items-center">
            {
                (arrKeys.length > 0 && arrKeys) ?
                    arrKeys.map((res, i) => {
                        return (<div className="col-md-3" key={i}>
                            <div className="form-check mb-3">
                                <Input type="checkbox" className="form-check-input" checked={res.checked} value={res.name} id={res.name} onChange={(e) => onChecked(e, res)} />
                                <Label className="form-check-label" htmlFor={res.name} >{res.name}</Label>
                            </div>
                        </div>)
                    })
                    : ""
            }

            <button className="btn btn-primary waves-effect waves-light btn btn-primary" onClick={submitSelectedList}>Submit</button>

        </div>
    )
}

export default ListKeys;