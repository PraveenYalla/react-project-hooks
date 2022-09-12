import React from "react"
import { Container, Row, Col } from "reactstrap"
import { useDispatch } from 'react-redux';
import { changeLayout } from '../../store/layout/actions'
import EmployeeList from "../EmployeeLists/EmployeeList";
import ListPage from "../ListPage/ListPage";
import QrCode from "../qrcode/qrcode";
import Weather from "../Weather/Weather";


const Dashboard = () => {

  const dispatch = useDispatch();


  const clickHandle = e => {
    console.log(e)
    dispatch(changeLayout("horizontal"))
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
            <h3>
              Dashboard
            </h3>

            <Row>
              <Col xl={3}>
                <QrCode/>
              </Col>
              
              <Col xl={5}>
                  <Weather />
              </Col>
              <Col xl={4}>
                <EmployeeList />
              </Col>
              <Col xl={12}>
                <ListPage />
              </Col>
            </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard