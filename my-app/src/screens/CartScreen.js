import Button from "@restart/ui/esm/Button";
import React, { useEffect } from "react";
import { Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

function CartScreen() {
  let { productId } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log("cartItems:", cartItems);

  useEffect(() => {
    if (productId) {
      console.log(productId);
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  function removeFromCartHandler(id) {
    dispatch(removeFromCart(id));
  }

  function checkOutHandler() {
    navigate("login/?redirect=shipping");
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            You cart is empty
            <br /> <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} atl={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + Number(item.qty) * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn btn-primary btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
