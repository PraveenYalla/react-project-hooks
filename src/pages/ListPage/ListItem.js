import React from 'react';
import { Row, Col } from 'reactstrap';

const ListItem = ({ selectedObjKeys, item }) => {
    // const item = props.item;
    return (
        <div>
            <Row className="emp-item align-items-center g-0 mt-3">
                {
                    (selectedObjKeys.length > 0) ? (
                        selectedObjKeys.map((res, i) => (
                            <Col sm={4} key={i}>
                                <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-circle-medium text-warning me-2"></i> {item[res.name]} </p>
                            </Col>
                        ))

                    ) : (<p>no results</p>)
                }

                {/* <Col sm={4}>
                    <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-circle-medium text-warning me-2"></i> {item.name} </p>
                </Col>
                <Col sm={4}>
                    <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-cellphone-iphone text-warning me-2"></i>{item.phone}</p>  
                </Col>
                <Col sm={4}>
                    <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-web text-warning me-2"></i>{item.website}</p>  
                </Col> */}

            </Row>
        </div>
    )
}

export default ListItem;