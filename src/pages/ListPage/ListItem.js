import React from 'react';
import { Row, Col, Table } from 'reactstrap';
import SimpleBar from "simplebar-react"

const ListItem = React.memo(({ selectedObjKeys, item }) => {
    console.log(selectedObjKeys)
    console.log(item)
    return (
        <div>
            <div className="list-table">

              <Table className="table-centered table-nowrap mb-0" >

                <thead className="table-light">
                    <tr>
                        {
                            (selectedObjKeys.length > 0) ? (
                                selectedObjKeys.map((res, i) => (
                                    <th>{res.name}</th>
                                ))
                            ) : ""
                        }
                    </tr>

                </thead>

                <tbody>
                        {
                            (item.length > 0) ? (
                                item.map((res, i) => (
                                    <tr>
                                        {selectedObjKeys.map((res1, j) => (

                                            <td>
                                                {res[res1.name]}
                                            </td>
                                        ))}
                                    </tr>
                                ))

                            ) : ""
                        }
                </tbody>
            </Table>

            </div>
        </div>
    )
})

export default ListItem;