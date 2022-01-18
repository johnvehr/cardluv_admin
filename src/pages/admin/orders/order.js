import React, {useEffect, useState, useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {Row, Container, Col} from 'react-bootstrap'
import {retrieveOrder, markFulfilled} from '../../../redux/reducers/orderReducer'
import ReactToPrint from 'react-to-print';
import {Empty, Button} from 'antd'

const Order = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef(null)
  const order = useSelector(state => state.order.order)

  useEffect(() => {
    dispatch(retrieveOrder(id))
  }, [])

  const redirectCallback = () => {
    navigate('/admin/orders')
  }

  const markOrderFulfilled = () => {
    dispatch(markFulfilled(id, redirectCallback))
  }

  return(
    <>
    <Button onClick={()=> markOrderFulfilled(order)}>Mark Fulfilled</Button>
    {
      order.order_line_items &&
      order.order_line_items.map((order_line_item) => (
        <Row>

          <Col md='2'>
            <img src={order_line_item.card.card_image} style={{width: 100}}/>
          </Col>
          <Col md='2'>
            {
              order_line_item.bracelet &&
              <img src={order_line_item.bracelet.bracelet_image} style={{width: 100}}/>
            }
            {
              !order_line_item.bracelet &&
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
          </Col>
          <Col md='2'>
            {
              order_line_item.gift_card &&
              <>
              <img src={order_line_item.gift_card.gift_card_image} style={{width: 100}}/>
              <p>{order_line_item.gift_card.price} | {order_line_item.gift_card.company}</p>
              </>
            }
            {
              !order_line_item.gift_card &&
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
          </Col>
          <Col md='2'>
            {
              order_line_item.confetti &&
              <p>Add Confetti</p>
            }
            {
              !order_line_item.confetti &&
              <p>No Confetti</p>
            }
          </Col>
          <Col md='3'>
            <div ref={ref} className='message-box'>
              <p className={`message ${order_line_item.message.font}`}>{order_line_item.message.to_title},</p>
              <p className={`message ${order_line_item.message.font}`}>{order_line_item.message.to_message}</p>
            </div>

              <ReactToPrint
                trigger={() => <button>Print this out!</button>}
                content={() => ref.current}
              />
          </Col>
        </Row>
      ))

    }
</>
  )
}

export default Order
