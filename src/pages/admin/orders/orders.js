import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Container, Row, Col, Badge, Card, Dropdown, Table,Button } from "react-bootstrap";
import {Drawer} from 'antd'
import {retrieveOrders} from '../../../redux/reducers/orderReducer'
import ReactToPrint from 'react-to-print';

//import { ComponentToPrint } from './ComponentToPrint';

const Orders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.order.orders)
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(retrieveOrders())
  },[])

  return(
    <Container>
    <Card className="flex-fill w-100">
  <Card.Header>
    <div className="card-actions float-end">
      <Dropdown align="end">
        <Dropdown.Toggle as="a" bsPrefix="-">

        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item></Dropdown.Item>
          <Dropdown.Item></Dropdown.Item>
          <Dropdown.Item></Dropdown.Item>
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
        <th>Created</th>

        <th className="d-none d-xl-table-cell">Paid</th>
        <th className="d-none d-xl-table-cell">Fulfilled</th>
        <th className="d-none d-xl-table-cell">Total Cost</th>

        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {orders &&
      orders.map((order) => (
        <tr>

          <td className="d-none d-xl-table-cell" onClick={()=> navigate(`/admin/orders/${order.id}`)}>{order.created_at}</td>


        </tr>
      ))
    }

    </tbody>
  </Table>
</Card>
    </Container>
  )
}

export default Orders
