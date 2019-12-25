import React, { useState, useMemo } from 'react';
import { formatPrice } from 'commons/helper';
import axios from 'commons/axios';

const CartItem = props => {
  const [mount, setMount] = useState(props.cart.mount);
  const { id, name, image, price } = props.cart || {};
  const sum = useMemo(() => formatPrice(mount * parseInt(price)), [mount, price]);

  const handleChange = e => {
    const _mount = parseInt(e.target.value);
    setMount(_mount);
    const newCart = { ...props.cart, mount: _mount };
    axios.put(`/carts/${id}`, newCart);
    props.updateCart(newCart);
  };

  const deleteCart = () => {
    axios.delete(`carts/${id}`).then(response => {
      props.deleteCart(id);
    });
  };

  return (
    <div className="columns is-vcentered">
      <div className="column is-narrow" onClick={deleteCart}>
        <span className="close">X</span>
      </div>
      <div className="column is-narrow">
        <img src={image} alt={name} width="100" />
      </div>
      <div className="column cart-name is-narrow">{name}</div>
      <div className="column">
        <span className="price">{formatPrice(price)}</span>
      </div>
      <div className="column">
        <input className="input num-input" type="number" value={mount} min={1} onChange={handleChange} />
      </div>
      <div className="column">
        <span className="sum-price">{sum}</span>
      </div>
    </div>
  );
};

export default CartItem;
