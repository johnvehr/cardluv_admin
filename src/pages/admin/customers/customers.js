import React, {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Container, Row, Col, Badge, Card, Dropdown, Table,Button } from "react-bootstrap";
import { Calendar, Filter, RefreshCw } from "react-feather";
import {retrieveAdminInfo} from '../../../redux/reducers/adminReducer'
import { MoreHorizontal } from "react-feather";


const Customers = () => {

  const dispatch = useDispatch()

  const customers = useSelector(state => state.admin.customers)

  useEffect(()=> {
    console.log("CALLED")
      dispatch(retrieveAdminInfo())
  }, [])

  return (
    <React.Fragment>
      <Container fluid className='p-0'>
      <Row className="mb-2 mb-xl-3">
    <Col xs="auto" className="d-none d-sm-block">
      <h3>Customers</h3>
    </Col>

    <Col xs="auto" className="ms-auto text-end mt-n1">
      <Dropdown className="d-inline me-2">
        <Dropdown.Toggle variant="light" className="bg-white shadow-sm">
          <Calendar className="feather align-middle mt-n1" /> Today
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Action</Dropdown.Item>
          <Dropdown.Item>Another Action</Dropdown.Item>
          <Dropdown.Item>Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Seperated link</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button variant="primary" className="shadow-sm me-1">
        <Filter className="feather" />
      </Button>
      <Button variant="primary" className="shadow-sm">
        <RefreshCw className="feather" />
      </Button>
    </Col>
  </Row>

    <Card className="flex-fill w-100">
      <Card.Header>
        <div className="card-actions float-end">
          <Dropdown align="end">
            <Dropdown.Toggle as="a" bsPrefix="-">
              <MoreHorizontal />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another Action</Dropdown.Item>
              <Dropdown.Item>Something else here</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Card.Title tag="h5" className="mb-0">
          Card Store
        </Card.Title>
      </Card.Header>
    <Table striped className="my-0">
      <thead>
        <tr>
          <th>Email</th>
          <th className="d-none d-xl-table-cell">Created At</th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {customers &&
        customers.map((customer) => (
          <tr>
            <td className="d-none d-xl-table-cell">{customer.email}</td>
            <td className="d-none d-xl-table-cell">{customer.created_at}</td>

            <td>
              <Badge bg='success'>Edit</Badge>
              <Badge bg='danger'>Delete</Badge>
            </td>
          </tr>
        ))
      }

      </tbody>
    </Table>
  </Card>
      </Container>
    </React.Fragment>
  )
}

export default Customers
