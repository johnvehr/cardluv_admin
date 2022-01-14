import React, {useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form, Input, Button,Select,Upload,InputNumber} from 'antd'
import {Card} from 'react-bootstrap'
import {addNewGiftCard, addNewImage} from '../../../redux/reducers/giftcardReducer'

const NewGiftCard = () => {
  const {Option} = Select;
  const dispatch = useDispatch()

  //Bracelet Image
  const [giftcard_image] = useSelector(state => state.giftcard.giftcard_image)
  const [image_url, setImageUrl] = useState('')
  const [fileList, setFileList] = useState([]);

  //Inventory Details
  const [status, setStatus] = useState('')
  const [tags, setTags] = useState([])
  const [company, setCompany] = useState('')

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

  const addGiftCard = () => {
    const giftcard = {gift_card: {
      price_list: tags,
      status: setStatusAsInteger[status],
      image: image_url,
      company: company
    }}
    dispatch(addNewGiftCard(giftcard))
  }

  const setGiftCardStatus = (value) =>{
    setStatus(value)
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList)
  };

  const handleTag = (value) => {
    setTags(value)
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
        GiftCard Image
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
      GiftCard Details
    </Card.Title>
  </Card.Header>
  <Card.Body>
  <Form name="horizontal_login" layout="inline">
  <Form.Item>
    <Select size="large" placeholder='Status' style={{ width: 120 }} onChange={setGiftCardStatus}>
      <Option value='Live'>Live</Option>
      <Option value='NotLive'>Not Live</Option>
    </Select>
  </Form.Item>

  <Form.Item>
    <Input
          size="large"
          type="text"
          name="company"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
          placeholder="Gift Card Company" />
  </Form.Item>

  <Form.Item>
  <Select
    mode="multiple"
    size='large'
    placeholder="Add Prices"
    onChange={handleTag}
    style={{ width: '350px' }}
  >
    <Option key='10'>10</Option>
    <Option key='20'>20</Option>
    <Option key='40'>40</Option>
    <Option key='50'>50</Option>
    <Option key='60'>60</Option>
    <Option key='100'>100</Option>
  </Select>
  </Form.Item>

    </Form>
  </Card.Body>
</Card>

        <Button size='large' onClick={()=> addGiftCard()}>Submit Gift Card</Button>


    </div>
  )
}

export default NewGiftCard
