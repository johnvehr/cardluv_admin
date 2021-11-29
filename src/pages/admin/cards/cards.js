import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from 'react-redux'
import { Container, Row, Col, Badge, Card, Dropdown, Table,Button } from "react-bootstrap";
import { MoreHorizontal } from "react-feather";
import {Collapse, Popconfirm, message} from 'antd'
import {useNavigate} from 'react-router-dom'
import {retrieveCards, deleteCard} from '../../../redux/reducers/cardReducer'

const Cards = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {Panel} = Collapse
  const cards = useSelector(state => state.card.cards)

  const [addCardStatus, setAddCardStatus] = useState(false)

  useEffect(() => {
    dispatch(retrieveCards())
  }, [])

  const editCard = (cardId) => {
    console.log('test')
   navigate(`/admin/cards/${cardId}`)
  }

  const removeCard = (cardId) => {
    dispatch(deleteCard(cardId))
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  return (
    <React.Fragment>
      <Container fluid className="p-0">
      <Button onClick={()=> navigate('/admin/cards/new')}>Add Card</Button>

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
          <th className="d-none d-xl-table-cell">Card Title</th>
          <th className="d-none d-xl-table-cell">Status</th>
          <th className="d-none d-xl-table-cell">Price</th>
          <th className="d-none d-xl-table-cell">Inventory</th>
          <th className="d-none d-xl-table-cell">Sku</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {cards &&
        cards.map((card) => (
          <tr>
            <td><img width="98" height="118" src={card.image} /></td>
            <td className="d-none d-xl-table-cell">{card.title}</td>
            <td className="d-none d-xl-table-cell">
              <Badge bg={card.status == 'live' ? 'primary' : 'secondary'}>{card.status}</Badge>
            </td>
            <td className="d-none d-xl-table-cell">{card.price}</td>
            <td className="d-none d-xl-table-cell">{card.inventory}</td>
            <td className="d-none d-xl-table-cell">{card.sku}</td>
            <td>
              <Badge bg='success' onClick={()=> editCard(card.id)}>Edit</Badge>
              <Popconfirm
                title="Are you sure to delete this card?"
                onConfirm={()=>removeCard(card.id)}
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

export default Cards
