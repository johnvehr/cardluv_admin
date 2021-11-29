import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from 'react-redux'
import { MoreHorizontal } from "react-feather";
import {Collapse, Popconfirm, message,Drawer} from 'antd'
import {useNavigate} from 'react-router-dom'
import {retrieveDesigners, removeDesigner} from '../../../redux/reducers/designerReducer'

import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ProgressBar,
  Row,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Project = ({ name, state, color, percentage, image, cards, showDrawer }) => (
  <Card onClick={()=> showDrawer(name)}>
    {image ? <Card.Img src={image} alt="Card image cap" /> : ""}
    <Card.Header className="px-4 pt-4">
      <Card.Title tag="h5" className="mb-0">
        {name}
      </Card.Title>

    </Card.Header>
    <Card.Body className="px-4 pt-2">

    </Card.Body>

  </Card>
);


const Designers = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {Panel} = Collapse
  const designers = useSelector(state => state.designer.designers)
  const [visible, setVisible] = useState(false)
  const [drawerObj, setDrawerObj] = useState('')

  useEffect(() => {
    dispatch(retrieveDesigners())
  }, [])

  const editDesigner = (designerId) => {
    console.log('test')
   navigate(`/admin/designers/${designerId}`)
  }

  const deleteDesigner = (designerId) => {
    dispatch(removeDesigner(designerId))
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const showDrawer = (name) => {
    setVisible(true)
    setDrawerObj(name)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <React.Fragment>

  <Container fluid className="p-0">

    <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        drawerObj={drawerObj}
      >
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          {drawerObj}
        </p>
      </Drawer>

    <Button variant="primary" className="float-end mt-n1" onClick={()=> navigate('/admin/designers/new')}>
      <FontAwesomeIcon icon={faPlus} /> New Designer
    </Button>
    <h1 className="h3 mb-3">Designers</h1>
    <Row>

    {
      designers &&
      designers.map((designer) => (
        <Col md="6" lg="3">
          <Project
            name={designer.name}
            state="On hold"
            color="danger"
            percentage="0"
            image={designer.image}
            cards={designer.cards}
            showDrawer={showDrawer}
          />
        </Col>
      ))
    }

    </Row>
  </Container>
</React.Fragment>
  )
}

export default Designers
