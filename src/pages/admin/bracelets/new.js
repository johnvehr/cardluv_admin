import React, {useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form, Input, Button,Select,Upload,InputNumber} from 'antd'
import {Card} from 'react-bootstrap'
import {addNewBracelet, addNewImage} from '../../../redux/reducers/braceletReducer'

const NewBracelet = () => {
  const {Option} = Select;
  const dispatch = useDispatch()

  //Bracelet Image
  const [bracelet_image] = useSelector(state => state.bracelet.bracelet_image)
  const [image_url, setImageUrl] = useState('')
  const [fileList, setFileList] = useState([]);

  //Inventory Details
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState('')
  const [gender, setGender] = useState('')
  const [inventory, setInventory] = useState('')
  const [sku, setSku] = useState('')

  const setStatusAsInteger = {'Live': 0, 'NotLive': 1}
  const setGenderAsInteger = {'Male': 0, 'Female': 1, 'Unisex': 2}

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

  const addBracelet = () => {
    const bracelet = {bracelet: {
      gender: setGenderAsInteger[gender],
      price: price,
      status: setStatusAsInteger[status],
      image: image_url,
      sku: sku,

    }}
    dispatch(addNewBracelet(bracelet))
  }

  const setBraceletPrice = (value) =>{
    setPrice(value)
  }

  const setBraceletStatus = (value) =>{
    setStatus(value)
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList)
  };

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
        Bracelet Image
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
      Bracelet Details
    </Card.Title>
  </Card.Header>
  <Card.Body>
  <Form name="horizontal_login" layout="inline">
  <Form.Item>
    <Select size="large" placeholder='Status' style={{ width: 120 }} onChange={setBraceletStatus}>
      <Option value='Live'>Live</Option>
      <Option value='NotLive'>Not Live</Option>
    </Select>
  </Form.Item>
  <Form.Item>
    <Select size="large" placeholder='Gender' style={{ width: 120 }} onChange={setGender}>
      <Option value='Male'>Male</Option>
      <Option value='Female'>Female</Option>
      <Option value='Unisex'>Unisex</Option>
    </Select>
  </Form.Item>
  <Form.Item>
    <Select size="large" placeholder='Price' style={{ width: 120 }} onChange={setBraceletPrice}>
      <Option value="175">$1.75</Option>
      <Option value="275">$2.75</Option>
      <Option value="375">$3.75</Option>
      <Option value="7">$7</Option>

    </Select>
  </Form.Item>
  <Form.Item>
    <Input
          size="large"
          type="sku"
          name="sku"
          onChange={(e) => setSku(e.target.value)}
          value={sku}
          placeholder="Bracelet Sku" />
  </Form.Item>

    </Form>
  </Card.Body>
</Card>

        <Button size='large' onClick={()=> addBracelet()}>Submit Bracelet</Button>


    </div>
  )
}

export default NewBracelet
