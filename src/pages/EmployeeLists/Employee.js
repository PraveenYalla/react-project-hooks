import React from 'react';
import { Row, Col } from 'reactstrap';

const Employee = props => {
    const user = props.user;
    return (
        <div>
            <Row className="emp-item align-items-center g-0 mt-3">
                <Col sm={4}>
                    <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-circle-medium text-warning me-2"></i> {user.name} </p>
                </Col>
                <Col sm={4}>
                    <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-cellphone-iphone text-warning me-2"></i>{user.phone}</p>  
                </Col>
                <Col sm={4}>
                    <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-web text-warning me-2"></i>{user.website}</p>  
                </Col>

            </Row>
        </div>
    )
}

export default Employee;