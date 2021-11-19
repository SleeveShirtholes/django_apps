import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";

function CartScreen() {
  const { productId } = useParams();
  console.log(productId);
  let [searchParams, setSearchParams] = useSearchParams();
  const qty = searchParams.get("qty");

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <div>Cart {productId}</div>;
}

export default CartScreen;
