import React, {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form, Input, Button,Select,Upload,InputNumber} from 'antd'
import {Card} from 'react-bootstrap'
import {addNewDesigner, addNewImage} from '../../../redux/reducers/designerReducer'
import {states} from '../../../utils/states'

const NewDesigner = () => {
  const {Option} = Select;
  const dispatch = useDispatch()

  //Card Image
  const [designer_image] = useSelector(state => state.designer.designer_image)
  const [image_url, setImageUrl] = useState('')
  const [fileList, setFileList] = useState([]);


  //Designer Details
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

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

  const addDesigner = () => {
    const designer = {designer: {
      name: name,
      phone: phone,
      image: image_url
    }}
    dispatch(addNewDesigner(designer))
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList)
  };

  const handleState = (value) => {
    setState(value)
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
        Designer Image
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
      Designer Details
    </Card.Title>
  </Card.Header>
  <Card.Body>
  <Form name="horizontal_login" layout="inline">
  <Form.Item>
    <Input
          size="large"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Designer Name" />
  </Form.Item>
  <Form.Item>
    <Input
          size="large"
          type="text"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          placeholder="Designer Phone" />
  </Form.Item>

  <Form.Item>
  </Form.Item>
    </Form>
    <Form>
      <Form.Item>
        <Input
          size='large'
          type='text'
          onChange={(e) => setStreet(e.target.value)}
          value={street}
          placeholder='Street Address'
          />
      </Form.Item>
      </Form>
    <Form name="horizontal_login" layout="inline">
      <Form.Item>
        <Input
          size='large'
          type='text'
          onChange={(e) => setCity(e.target.value)}
          placeholder='City'
          />
      </Form.Item>
      <Form.Item>
      <Select
        size='large'
        placeholder="State"
        onChange={handleState}
        style={{ width: '150px' }}
      >
        {
          states &&
          states.map((state) => (
            <Option value={state}>{state}</Option>
          ))
        }
      </Select>
      </Form.Item>
      <Form.Item>
        <Input
          size='large'
          type='text'
          onChange={(e) => setZip(e.target.value)}
          placeholder='Zip'
          />
      </Form.Item>
    </Form>
  </Card.Body>
</Card>

    <Button size='large' onClick={()=> addDesigner()}>Submit Designer</Button>


    </div>
  )
}

export default NewDesigner
