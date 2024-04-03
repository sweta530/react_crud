import { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";
import {useNavigate, useParams} from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const params = useParams()

  const [title,setTitle] = useState("");
  const [brand,setBrand] = useState("");
  const [category,setCategory] = useState("");
  const [price,setPrice] = useState("");
  const [rating,setRating] = useState("");
  const productId = params.productId;
  const [isUpdate,setIsUpdate] = useState(false);

  useEffect(()=>{
    checkForId()
  },[productId]);

  function checkForId() {
    console.log('call');
    if(productId){
      setIsUpdate(true);
      fetch('https://dummyjson.com/products/'+productId)
      .then(res => res.json())
      .then((data)=> {
        setBrand(data.brand);
        setCategory(data.category);
        setPrice(data.price);
        setRating(data.rating);
        setTitle(data.title);
      });
    }
  }

  function AddProduct() {
      let data = {title,brand,category,price,rating};
      fetch('https://dummyjson.com/products/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then((data)=> {
          console.log("Added Product \n"+JSON.stringify(data))
      });
      navigate('/');
  }

  function UpdateProduct() {
    let data = {title,brand,category,price,rating};
    fetch('https://dummyjson.com/products/'+productId, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((data)=> {
        console.log("Updated Product \n"+JSON.stringify(data))
    });
    navigate('/');
}
  
  return (
    <>
    {isUpdate ? <h1>Update Product</h1> : <h1>Add Product</h1>}
      
      <Form.Group className="mb-3" >
        <Form.Control type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Control type="text" placeholder="Brand" value={brand} onChange={(e)=>setBrand(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Control type="text" placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Control type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} min={1} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Control type="number" placeholder="Rating" value={rating} min={1} max={5} step={0.1} onChange={(e)=>setRating(e.target.value)} />
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={()=>{isUpdate ? UpdateProduct() : AddProduct()}}>
        Submit
      </Button>
    </>
  );
}

export default AddProduct;