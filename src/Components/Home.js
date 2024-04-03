import { Table, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
  })

  function getProducts() {
    fetch("https://dummyjson.com/products").then((result) => {

      result.json().then((resp) => {
        setProducts(resp.products)
        // setProducts(resp.products.filter((item)=>item.id < 30))
        //   console.log(products);
      })
    })
  }

  function deleteProduct(id) {
    fetch('https://dummyjson.com/products/' + id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then((data) => {
        console.log("Deleted Product \n" + JSON.stringify(data))
      });
  }

  return (
    <>
      <h1>API Demo</h1>
      <Button onClick={() => navigate('/add')}>Add Product</Button>
      <br /> <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>brand</th>
            <th>category</th>
            <th>Price</th>
            <th>Ratings</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) =>
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.rating}</td>
              <td>
                <Button onClick={() => navigate('/add/' + item.id)}>Edit</Button> <br /><br />
                <Button onClick={() => deleteProduct(item.id)}>Delete</Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default Home;