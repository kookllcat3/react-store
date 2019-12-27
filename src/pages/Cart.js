import React, { useState, useEffect, useMemo } from 'react';
import Layer from 'Layer';
import CartItem from 'components/CartItem';
import axios from 'commons/axios';
import { formatPrice } from 'commons/helper';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Cart = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const user = global.auth.getUser() || {};
    axios.get(`/carts?userId=${user.email}`).then(res => setCarts(res.data));
  }, []);

  const sum = useMemo(
    () => formatPrice(carts.map(cart => cart.mount * parseInt(cart.price)).reduce((pVal, cVal) => pVal + cVal, 0)),
    [carts]
  );
  const updateCart = cart => {
    const newCarts = [...carts];
    const index = newCarts.findIndex(c => c.id === cart.id);
    newCarts.splice(index, 1, cart);
    setCarts(newCarts);
  };

  const deleteCart = id => {
    setCarts(carts.filter(c => c.id !== id));
  };

  return (
    <Layer>
      <div className="cart-page">
        <span className="cart-title">Shopping Cart</span>
        <div className="cart-list">
          <TransitionGroup component={null}>
            {carts.map(cart => {
              return (
                <CSSTransition classNames="cart-item" timeout={300} key={cart.id}>
                  <CartItem key={cart.id} cart={cart} updateCart={updateCart} deleteCart={deleteCart} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>

        {carts.length === 0 ? <p className="no-cart">No Goods</p> : ''}

        <div className="cart-total">
          Total:
          <span className="total-price">{sum}</span>
        </div>
      </div>
    </Layer>
  );
};

export default Cart;
