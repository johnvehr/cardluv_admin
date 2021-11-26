import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

//Actions
import {signInAdmin} from '../../redux/reducers/authReducer'

import {Button} from 'react-bootstrap'
import {
  Input,
  Form
} from 'antd'

//import AuthModal from '../../components/auth/authModal'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //Admin State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const pending = useSelector(state => state.auth.pending)
  const error_message = useSelector(state => state.auth.error_message)
  const error_status = useSelector(state => state.auth.error_status)

  const redirectCallback = () => {
    navigate('/admin/cards')
  }

  const submitSignIn = (e) => {
    e.preventDefault()
    const admin_credentials = {admin: {email: email, password: password}}
    dispatch(signInAdmin(admin_credentials, redirectCallback))
  }

  return (

    <div>
    { error_status &&
      <p>{error_message}</p>
    }
      Admin
      <Form>
        <Form.Item>
          <Input
              size="large"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email" />

        </Form.Item>
        <Form.Item>
          <Input
              size="large"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password" />

        </Form.Item>
        <Form.Item>
        <div className="text-center mt-3">
          <Button onClick={(e)=> submitSignIn(e)}>Sign In</Button>
        </div>
        </Form.Item>
      </Form>
      {
        pending &&
        <p>Pending</p>
      }
    </div>
  )
}

export default Auth
