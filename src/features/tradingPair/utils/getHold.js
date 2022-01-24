const getHold = (orders) => {
  const orderQuantities = orders?.map((order) => order.quantity);
  if (orderQuantities && orderQuantities.length) {
    return orderQuantities.reduce((s, v) => s + v).toFixed(8) * 1;
  }

  return 0;
};

export default getHold;
