import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Input, Button,Select,Upload,InputNumber} from 'antd'
import {Card} from 'react-bootstrap'
import {useParams} from 'react-router-dom'

import {retrieveCard} from '../../../redux/reducers/cardReducer'

const CardDetail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()

  const card = useSelector(state => state.card.card)
  const [title,setTitle] = useState('')

  useEffect(()=> {
    dispatch(retrieveCard(id))

    if(card){
      setTitle(card.title)
    }

  }, [])

  return (
    <div>Card Details/Edit

        <Card>
          <Card.Header className="pb-0">
            <Card.Title tag="h5" className="mb-0">
              Card Details
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form name='horizontal_login' layout='inline'>
              <Form.Item>
                <Input
                  value={title}
                  onChange={(e)=> setTitle(e.target.value)}
                  type='text'
                  name='title'
                  size='large'
                  />

              </Form.Item>
            </Form>
          </Card.Body>
        </Card>
    </div>
  )
}

export default CardDetail
