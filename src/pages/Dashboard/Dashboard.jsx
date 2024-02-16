import React, { useEffect, useState } from 'react'
import {Row, Col, Input, Button, Container, Card, CardBody, Pagination, PaginationItem, PaginationLink} from 'reactstrap'
import { useStore } from '../../store';
import { getProducts, searchProducts } from '../../fakebackend/store';
import { map } from "lodash";
import StarRatings from 'react-star-ratings';

//price slider
import Nouislider from 'nouislider-react';
import "nouislider/distribute/nouislider.css";


const Dashboard = () => {
  const {cartSize, subTotal, addToCart} = useStore();
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState("home");
  const [username, setUsername] = useState("User");

  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(12);

  const fetchProducts = () => {
    getProducts(skip, limit).then((collection) => {
      setProducts(collection.products);
      setLimit(collection.limit);
      setTotalPages(Math.ceil(collection.total / limit));
    }).catch((error) => {
      console.log(error);
    })
  }

  const findProducts = () => {
    setSkip(0);
    searchProducts(0, limit, search).then((collection) => {
      setProducts(collection.products);
      setTotalPages(Math.ceil(collection.total / limit));
      setPage(1);
    }).catch((error) => {
      console.log(error);
    });
  }

  const onUpdate = (render, handle, value) => {
      setMode("filter");
      setProducts(prevproducts => prevproducts.filter(product => product.price >= value[0] && product.price <= value[1]));
  };
  useEffect(() => {
    fetchProducts();
    setUsername(JSON.parse(localStorage.getItem('authUser')).username);
  }, []);

  useEffect(() => {
      if(mode === "home") fetchProducts(skip, limit);
      else if(mode === "search") findProducts();
  }, [skip, mode]);

  const handlePageClick = (page) => {
    setPage(page);
    setSkip(() => (page - 1) * limit);
    window.scrollTo(0, 0);
  }
  const buttonClick = (e) => {
    e.preventDefault();
    setMode("search")
  }

  return (
    <React.Fragment>
      <div className='d-flex justify-content-between z-1 header'>
          <div className=' logo m-2'>
            <span className='logo p-2' onClick={() => setMode("home")}>web Logo</span>
          </div>
          <div className=' section1 m-2'>
              <span className='p-2 head-user'>Hi, {`${username}`}</span>
              <span className='p-2 head-cart'>
                <span className='cart-val'>
                  {subTotal>0 ? `$${subTotal}` :null}
                  <i className=" bx bx-shopping-bag head-cart"></i>
                {cartSize}{" "}
                </span>
              </span>
          </div>
        </div>
      <Container className='main-box' >
      {/* topbar - serach, filter by price */}
      <Row className='mt-4'>
        <Col className='m-2 d-flex justify-content-start'>
          <Input name='product'
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='form-input w-50 m-2'
            placeholder='Search by product'
          />
          <Button onClick={(e) => buttonClick(e) } className='btn p-1 m-2 w-25'>
            Search
          </Button>
          
        </Col>
        <Col className=' m-2'>
          <div className='m-4'>
          <Nouislider
          range={{ min: 0, max: 1500 }}
          tooltips={true}
          start={[100, 500]}
          connect
          tooltipVisible
          step={10}
          onSlide={onUpdate}
        />
          </div>
        
        </Col>
      </Row>
      <Row className='mt-4 d-flex justify-content-around mb-4' >
        { 
          products && products.map((product, key) =>(
            <Col xl={3} sm={6} key={"_col_" + key} className='mb-2' >
                <Card className='product-card'
                  onClick={((e) => {
                    e.preventDefault();
                    let newproduct = {...product, count: 1};
                    console.log(newproduct);
                    addToCart(newproduct);
                  })}
                >
                  <CardBody className='position-relative'>
                    <div className='text-center '>
                      <img
                      src= {product?.thumbnail}
                      className='product-image'
                      />
                    </div>
                    <div className='text-center'>
                    <h5 className="mb-1 mt-2 text-truncate">
                          {product?.title}{" "}
                    </h5>
                    <div className='mb-2'>
                      <StarRatings
                        rating={product.rating}
                        starRatedColor="#F1B44C"
                        starEmptyColor="#74788d"
                        numberOfStars={5}
                        name="rating"
                        starDimension="14px"
                        starSpacing="1px"
                      />
                    </div>
                    <h5 className="my-0  text-truncate">
                              <b>${product.price}</b>
                            </h5>
                    </div>
                  </CardBody>
                </Card>
            </Col>
          ))
        }
      </Row>
      {products.length >= 12 ?  <Row>
        <Col lg={12}>
          <Pagination className="pagination pagination-rounded justify-content-center mt-3 mb-4 pb-1">
            <PaginationItem disabled={page === 1}>
              <PaginationLink
                previous
                to="#"
                onClick={() => handlePageClick(page - 1)}
              />
            </PaginationItem>
            {map(Array(totalPages), (item, i) => (
              <PaginationItem active={i + 1 === page} key={i}>
                <PaginationLink
                  onClick={() => handlePageClick(i + 1)}
                  to="#"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={page === totalPages}>
              <PaginationLink
                next
                to="#"
                onClick={() => handlePageClick(page + 1)}
              />
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>: null}
      </Container>
    </React.Fragment>
  )
}

export default Dashboard;
