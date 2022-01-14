import React, {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Container, Row, Col, Badge, Card, Dropdown, Table,Button } from "react-bootstrap";
import { MoreHorizontal } from "react-feather";
import {Collapse, Popconfirm, message} from 'antd'

import {retrieveGiftCards, deleteGiftCard} from '../../../redux/reducers/giftcardReducer'

const GiftCards = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const giftcards = useSelector(state => state.giftcard.giftcards)


  useEffect(()=> {
    dispatch(retrieveGiftCards())
  },[])

  const editGiftCard = (cardId) => {
    console.log('test')
   navigate(`/admin/giftcards/${cardId}`)
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const removeGiftCard = (giftcardId) => {
    dispatch(deleteGiftCard(giftcardId))
  }

  return (
    <React.Fragment>
      <Container fluid className="p-0">
      <Button onClick={()=> navigate('/admin/giftcards/new')}>Add GiftCard</Button>

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
        GiftCard
      </Card.Title>
    </Card.Header>
    <Table striped className="my-0">
      <thead>
        <tr>
          <th>Image</th>
          <th className="d-none d-xl-table-cell">Status</th>
          <th className="d-none d-xl-table-cell">Company</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {giftcards &&
        giftcards.map((giftcard) => (
          <tr>
            <td><img width="98" height="118" src={giftcard.image} /></td>

            <td className="d-none d-xl-table-cell">
              <Badge bg={giftcard.status == 'live' ? 'primary' : 'secondary'}>{giftcard.status}</Badge>
            </td>
            <td className="d-none d-xl-table-cell">{giftcard.company}</td>

            <td>
              <Badge bg='success' onClick={()=> editGiftCard(giftcard.id)}>Edit</Badge>
              <Popconfirm
                title="Are you sure to delete this card?"
                onConfirm={()=>removeGiftCard(giftcard.id)}
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

export default GiftCards
