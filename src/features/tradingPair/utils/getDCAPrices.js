const getDCAPrices = (orders) => {
  const orderPrices = orders?.map((order) => order.price);
  if (orderPrices && orderPrices.length) {
    return (orderPrices.reduce((s, v) => s + v) / orders.length).toFixed(2) * 1;
  }

  return 0;
};

export default getDCAPrices;
