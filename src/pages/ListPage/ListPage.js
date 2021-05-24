import React, { useState, useEffect, useRef, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addAPI, getKeysArrayList, getKeysArray, setSelectedKeys, setUpdatedResults, resetStore } from '../../store/listpage/actions'

import { Card, CardBody, Row, CardTitle, Form, Container, Label, Input, FormGroup, Button } from "reactstrap"

import SimpleBar from "simplebar-react"
import ListItem from './ListItem';
import ListKeysArray from './ListKeysArray';
import ListKeys from './ListKeys';


function _getUpdatedData(ListData) {

    let objres = {};

    const flatternObj = (obj, prefix) => {
        for (let prop in obj) {
            let pre = prefix + "." + prop
            if (typeof obj[prop] !== 'object') {
                objres[pre] = obj[prop];
            } else {
                flatternObj(obj[prop], pre)
            }
        }
        return objres
    }

    const flattern = (obj) => {
        let result = {};
        let nestVal = {}
        for (let prop in obj) {
            if (typeof obj[prop] === 'object') {
                nestVal = flatternObj(obj[prop], prop);
            } else {
                result[prop] = obj[prop]
            }

        }
        return { ...result, ...nestVal }
    }

    const results = ListData.map(res => {
        return flattern(res);
    })


    return results;
}

// Get KeysArrayList

function _keysArraryList(arr) {
    if (arr) {
        let arrList = []
        for (var props in arr) {
            if (Array.isArray(arr[props])) {
                arrList.push(props);
            }
        }
        return arrList;
    }
}

// Get Keys from obj
function _keysFromObj(obj) {
    if (obj) {
        let getKeys = Object.keys(obj).map(res => {
            return {
                name: res,
                checked: false
            }
        });
        return getKeys;
    }
}



const ListPage = () => {

    // dispatch the actions
    const dispatch = useDispatch();

    // geting data from state using selector
    const _ListData = useSelector(state => state.ListPage.listData);
    const KeysArrayLists = useSelector(state => state.ListPage.keysArrayList);
    const ObjKeysArray = useSelector(state => state.ListPage.keysArray);
    const selectedObjKeys = useSelector(state => state.ListPage.selectedKeys);
    const updatedResultsList = useSelector(state => state.ListPage.updatedResults);
    const [ListData, setListData] = useState([])


    const inputQuery = useRef(null)

    useEffect(() => {
        console.log("Called")
        if (Array.isArray(_ListData) && _ListData.length > 0) {
            const results = _getUpdatedData(_ListData)
            setListData(results);
            if (results) {
                const objKeys = _keysFromObj(results[0]);
                dispatch(getKeysArray(objKeys));
            }
            dispatch(getKeysArrayList([]))
        } else if (typeof _ListData === 'object') {
            let arrList = _keysArraryList(_ListData);

            dispatch(getKeysArrayList(arrList))
            dispatch(getKeysArray([]));
        }
        return () => {

        }
    }, [_ListData])


    const onQueryChange = () => {
        let newQuery = inputQuery.current.value;
        if (newQuery !== "") {
            dispatch(resetStore());
            dispatch(addAPI(newQuery));
        }
    }

    const dispatchKeysArrayList = (item) => {
        let arrlist = _ListData[item];
        let getObjList = _getUpdatedData(arrlist);
        setListData(getObjList);
        const res = _keysFromObj(getObjList[0]);
        dispatch(getKeysArray(res))
    }




    const setSelectedObjKeys = (selectedKeys) => {
        dispatch(setSelectedKeys(selectedKeys))
    }

    const setUpdatedFinalResults = (selectedobjList) => {
            const selectedList = selectedobjList || selectedObjKeys
        const UpdateListResult = ListData.reduce((acc, cur) => {
            let obj = {}
            for (let i = 0; i < selectedList.length; i++) {
                obj[selectedList[i]['name']] = cur[selectedList[i]['name']]
            }
            
            acc.push(obj)
            return acc

        }, [])
        console.log(UpdateListResult);
        dispatch(setUpdatedResults(UpdateListResult))
    }


    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="mb-4">Create List</CardTitle>
                    <Row className="mb-3">
                        <div className="col-md-10">
                            <input
                                className="form-control"
                                type="text"
                                ref={inputQuery}
                                placeholder="Ex: https://xyz.com/users"
                            />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary waves-effect waves-light btn btn-primary" onClick={onQueryChange}>Submit</button>
                        </div>
                    </Row>
                    <Row>
                        {KeysArrayLists.length > 0 && <ListKeysArray KeysList={KeysArrayLists} dispatchKeysArrayList={dispatchKeysArrayList} />}
                    </Row>
                    <Row>
                        {ObjKeysArray.length > 0 && <ListKeys objKeysList={ObjKeysArray} setUpdatedFinalResults={setUpdatedFinalResults} selectedObjKeys={ selectedObjKeys } setSelectedObjKeys={setSelectedObjKeys} />}
                    </Row>
                    <SimpleBar style={{ maxHeight: "336px" }}>
                        {
                            (updatedResultsList.length > 0) ?
                                updatedResultsList.map((item, i) =>
                                    <ListItem key={i} item={item} selectedObjKeys={selectedObjKeys} />
                                )
                                : ""
                        }
                    </SimpleBar>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default ListPage;