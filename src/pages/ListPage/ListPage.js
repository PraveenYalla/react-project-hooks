import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addAPI, getKeysArrayList, getKeysArray, setSelectedKeys, setUpdatedResults, resetStore, startLoading, stopLoading } from '../../store/listpage/actions'

import { Card, CardBody, Row, CardTitle, Form, Container, Label, Input, FormGroup, Button, Spinner } from "reactstrap"

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
                arrList.push({
                    name: props,
                    selected: false
                });
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
    const loadingState = useSelector(state => state.ListPage.loading);

    const [ListData, setListData] = useState([])
    const [togglePanel, settogglePanel] = useState(false)


    const inputQuery = useRef(null)
    console.log("Called")

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


    // useEffect(() => {

    //     return () => {
    //         // cleanup
    //     }
    // }, [ObjKeysArray])

    const onQueryChange = useCallback(
        () => {
            let newQuery = inputQuery.current.value;
            if (newQuery !== "") {
                dispatch(resetStore());
                dispatch(addAPI(newQuery));
                settogglePanel(true);
            }
        }
    )

    // const onQueryChange = () => {
    //     let newQuery = inputQuery.current.value;
    //     if (newQuery !== "") {
    //         dispatch(resetStore());
    //         dispatch(addAPI(newQuery));
    //         settogglePanel(true)
    //     }
    // }

    const dispatchKeysArrayList = useCallback(
        (item) => {

            dispatch(setSelectedKeys([]))
            console.log(item);
            let arrlist = _ListData[item.name];
            let getObjList = _getUpdatedData(arrlist);
            setListData(getObjList);
            const res = _keysFromObj(getObjList[0]);
            let result = (JSON.stringify(ObjKeysArray) !== JSON.stringify(res)) ? res : ""
            console.log(result);
            dispatch(getKeysArray(result))
        }
    )

    // const dispatchKeysArrayList = (item) => {
    //     dispatch(setSelectedKeys([]))
    //     console.log(item);
    //     let arrlist = _ListData[item.name];
    //     let getObjList = _getUpdatedData(arrlist);
    //     setListData(getObjList);
    //     const res = _keysFromObj(getObjList[0]);
    //     let result = (JSON.stringify(ObjKeysArray) !== JSON.stringify(res)) ? res : ""
    //     console.log(result);
    //     dispatch(getKeysArray(result))
    // }

    // useEffect(() => {
    //     dispatch(setUpdatedResults([]))
    //     // dispatch(getKeysArray([result]))
    //     return () => {
    //     }
    // }, [ObjKeysArray])


    const setSelectedObjKeys = useCallback(
        (selectedKeys) => {
            dispatch(setSelectedKeys(selectedKeys))
        }
    )

    // const setSelectedObjKeys = (selectedKeys) => {
    //     dispatch(setSelectedKeys(selectedKeys))
    // }

    const setUpdatedFinalResults = useCallback(
         (selectedobjList) => {
            dispatch(setSelectedKeys(selectedobjList))
            const selectedList = (selectedobjList.length > 0) ? selectedobjList : selectedObjKeys;


            if (selectedList.length > 0) {
                const UpdateListResult =  ListData.reduce((acc, cur) => {
                    let obj = {}
                    for (let i = 0; i < selectedList.length; i++) {
                        obj[selectedList[i]['name']] = cur[selectedList[i]['name']]
                    }

                    acc.push(obj)
                    return acc

                }, [])
                if (UpdateListResult.length > 0) {
                     dispatch(setUpdatedResults(UpdateListResult))
                }
            }


        }
    )

    // const setUpdatedFinalResults = (selectedobjList) => {
    //     dispatch(setSelectedKeys(selectedobjList))
    //     const selectedList = (selectedobjList.length > 0) ? selectedobjList : selectedObjKeys;
    //     console.log(selectedList);
    //     console.log(selectedObjKeys);
    //     if (selectedList.length > 0) {
    //         const UpdateListResult = ListData.reduce((acc, cur) => {
    //             let obj = {}
    //             for (let i = 0; i < selectedList.length; i++) {
    //                 obj[selectedList[i]['name']] = cur[selectedList[i]['name']]
    //             }

    //             acc.push(obj)
    //             return acc

    //         }, [])
    //         if (UpdateListResult.length > 0) {
    //             dispatch(setUpdatedResults(UpdateListResult))
    //         }
    //     }
    // }


    // const makeTogglePanel = useMemo(() => {
    //     settogglePanel(!togglePanel)
    // },[])

    const makeTogglePanel = useCallback(
        () => {
            settogglePanel(!togglePanel)
        },
        [togglePanel]
    )

    // const makeTogglePanel = () => {
    //     settogglePanel(!togglePanel)
    // }


    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="mb-4">Create List</CardTitle>
                    <Row className="mb-3">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    ref={inputQuery}
                                    placeholder="Ex: https://xyz.com/users"
                                />
                                <button className="btn btn-primary waves-effect waves-light btn btn-primary" onClick={onQueryChange}>Submit</button>
                                <button onClick={makeTogglePanel} className="btn btn-danger waves-effect waves-light btn btn-primary">
                                    <i className="mdi mdi-arrow-down-drop-circle-outline me-2"></i>
                                </button>
                            </div>
                        </div>
                    </Row>
                    {loadingState && <div className="justify-content-center row"><Spinner className="m-1 " color="primary" /> </div>}
                    <div className={togglePanel ? 'showpanel' : 'hidepanel'}>
                        <Row>
                            {KeysArrayLists.length > 0 && <ListKeysArray KeysList={KeysArrayLists} dispatchKeysArrayList={dispatchKeysArrayList} />}
                        </Row>
                        <Row>
                            {ObjKeysArray.length > 0 && <ListKeys objKeysList={ObjKeysArray} setUpdatedFinalResults={setUpdatedFinalResults} selectedObjKeys={selectedObjKeys} setSelectedObjKeys={setSelectedObjKeys} />}
                        </Row>
                    </div>

                    <Row>
                        {(updatedResultsList.length > 0) && <ListItem item={updatedResultsList} selectedObjKeys={selectedObjKeys} />}
                    </Row>
                    {/* <SimpleBar style={{ maxHeight: "336px" }}>
                        {
                            (updatedResultsList.length > 0) ?
                                updatedResultsList.map((item, i) =>
                                    <ListItem key={i} item={item} selectedObjKeys={selectedObjKeys} />
                                )
                                : ""
                        }
                    </SimpleBar> */}
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default ListPage;