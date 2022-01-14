import React, {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Container, Row, Col, Badge, Card, Dropdown, Table,Button } from "react-bootstrap";
import { MoreHorizontal } from "react-feather";
import {Collapse, Popconfirm, message} from 'antd'

import {retrieveBracelets, deleteBracelet} from '../../../redux/reducers/braceletReducer'

const Bracelets = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const bracelets = useSelector(state => state.bracelet.bracelets)


  useEffect(()=> {
    dispatch(retrieveBracelets())
  },[])

  const editBracelet = (cardId) => {
    console.log('test')
   navigate(`/admin/cards/${cardId}`)
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const removeBracelet = (braceletId) => {
    dispatch(deleteBracelet(braceletId))
  }

  return (
    <React.Fragment>
      <Container fluid className="p-0">
      <Button onClick={()=> navigate('/admin/bracelets/new')}>Add Bracelet</Button>

      <Card className="flex-fill w-100">
    <Card.Header>
      <div className="card-actions float-end">
        <Dropdown align="end">
          <Dropdown.Toggle as="a" bsPrefix="-">
            <MoreHorizontal />
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
          <th>Image</th>
          <th className="d-none d-xl-table-cell">Sku</th>
          <th className="d-none d-xl-table-cell">Inventory</th>
          <th className="d-none d-xl-table-cell">Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {bracelets &&
        bracelets.map((bracelet) => (
          <tr>
            <td><img width="98" height="118" src={bracelet.image} /></td>

            <td className="d-none d-xl-table-cell">
              <Badge bg={bracelet.status == 'live' ? 'primary' : 'secondary'}>{bracelet.status}</Badge>
            </td>
            <td className="d-none d-xl-table-cell">{bracelet.sku}</td>
            <td className="d-none d-xl-table-cell">{bracelet.inventory}</td>
            <td className="d-none d-xl-table-cell">{bracelet.price}</td>
            <td>
              <Badge bg='success' onClick={()=> editBracelet(bracelet.id)}>Edit</Badge>
              <Popconfirm
                title="Are you sure to delete this card?"
                onConfirm={()=>removeBracelet(bracelet.id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Badge bg='danger'>Delete</Badge>
              </Popconfirm>

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

export default Bracelets
