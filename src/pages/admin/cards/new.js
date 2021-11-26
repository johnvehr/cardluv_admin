import React, {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form, Input, Button,Select,Upload,InputNumber} from 'antd'
import {Card} from 'react-bootstrap'
import {addNewCard, addNewImage} from '../../../redux/reducers/cardReducer'

const NewCard = () => {
  const {Option} = Select;
  const dispatch = useDispatch()

  //Card Image
  const [card_image] = useSelector(state => state.card.card_image)
  const [image_url, setImageUrl] = useState('')
  const [fileList, setFileList] = useState([]);

  //Inventory Details
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState('')
  const [inventory, setInventory] = useState('')
  const [sku, setSku] = useState('')

  //Card Details
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])

  const setStatusAsInteger = {'Live': 0, 'NotLive': 1}

  const cloudinaryCallback = (imageUrl) => {
    setImageUrl(imageUrl)
  }

  const addImage = () => {
    //console.log(image)
    console.log(fileList[0])
    const formData = new FormData()
    formData.append('file', fileList[0].originFileObj)
    formData.append('upload_preset', 'bjjmvy62')
    formData.append('cloud_name', 'cardluv')
    dispatch(addNewImage(formData, cloudinaryCallback))
  }

  const addCard = () => {
    const card = {card: {
      title: title,
      price: price,
      status: setStatusAsInteger[status],
      image: image_url,
      inventory: inventory,
      tag_list: tags,
      sku: sku
    }}
    dispatch(addNewCard(card))
  }

  const setCardPrice = (value) =>{
    setPrice(value)
  }

  const setCardStatus = (value) =>{
    setStatus(value)
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList)
  };

  const handleTag = (value) => {
    setTags(value)
  }

  const setInventoryAmount = (value) => {
    setInventory(value)
  }

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div>
<Form>
  <Card>
    <Card.Header className="pb-0">
      <Card.Title tag="h5" className="mb-0">
        Card Image
      </Card.Title>
    </Card.Header>
    <Card.Body>

    <Form.Item>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
      {fileList.length < 1 && '+ Upload'}
    </Upload>
    {/*<input type="file" onChange={(e)=> setImage(e.target.files[0])}></input> */}
    <p>Important: Tiffany, Please only submit image when you are sure you have the right image! </p>
    <Button shape="round" onClick={()=> addImage()}>Submit Image</Button>
    {
      image_url &&
      <p>Image Successfuly uploaded</p>
    }
    </Form.Item>
    </Card.Body>
  </Card>
</Form>

<Card>
  <Card.Header className="pb-0">
    <Card.Title tag="h5" className="mb-0">
      Card Details
    </Card.Title>
  </Card.Header>
  <Card.Body>
  <Form name="horizontal_login" layout="inline">
  <Form.Item>
    <Input
          size="large"
          type="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Card Title" />
  </Form.Item>

  <Form.Item>
  <Select
    mode="multiple"
    size='large'
    placeholder="Please select Card Categories"
    onChange={handleTag}
    style={{ width: '350px' }}
  >
    <Option key='Birthday'>Birthday</Option>
    <Option key='Wedding'>Wedding</Option>
    <Option key='Thanksgiving'>Thanksgiving</Option>
    <Option key='New Home'>New Home</Option>
    <Option key='Holiday'>Holiday</Option>
    <Option key='Thank You'>Thank You</Option>
  </Select>
  </Form.Item>
    </Form>
  </Card.Body>
</Card>


  <Card>
    <Card.Header className="pb-0">
      <Card.Title tag="h5" className="mb-0">
        Inventory Details
      </Card.Title>
    </Card.Header>
    <Card.Body>
    <Form name="horizontal_login" layout="inline">

    <Form.Item>
      <Select size="large" placeholder='Price' style={{ width: 120 }} onChange={setCardPrice}>
        <Option value="4.75">$6.75</Option>
        <Option value="5.75">$6.75</Option>
        <Option value="6.75">$6.75</Option>
        <Option value="6.99">$6.99</Option>
      </Select>
    </Form.Item>
    <Form.Item>
        <Form.Item name="input-number" noStyle>
          <InputNumber onChange={setInventoryAmount} size="large" min={0} max={2000} />
        </Form.Item>
        <span className="ant-form-text"> in stock</span>
      </Form.Item>
    <Form.Item>
      <Select size="large" placeholder='Status' style={{ width: 120 }} onChange={setCardStatus}>
        <Option value='Live'>Live</Option>
        <Option value='NotLive'>Not Live</Option>
      </Select>
    </Form.Item>
    <Form.Item>
      <Input
            size="large"
            type="sku"
            name="sku"
            onChange={(e) => setSku(e.target.value)}
            value={sku}
            placeholder="Card Sku" />
    </Form.Item>
      </Form>
    </Card.Body>
  </Card>



        <Button size='large' onClick={()=> addCard()}>Submit Card</Button>


    </div>
  )
}

export default NewCard
