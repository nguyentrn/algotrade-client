const formatOrders = (orders) => {
  const res = [];
  for (let i = 0; i < orders.length; i++) {
    const order = { ...orders[i] };
    if (order.quantity) {
      order.origQty = order.quantity;
      delete order.quantity;
    }
    order.amount = order.price * order.origQty;
    if (order.side === 'BUY') {
      order.color = 'blue';
      order.type = 'open-position';
    } else {
      if (order.price > orders[i - 1]?.price) {
        order.color = 'green';
        order.type = 'take-profit';
      } else {
        order.color = 'red';
        order.type = 'stop-loss';
      }
    }
    res.push(order);
  }
  return res;
};

export default formatOrders;
