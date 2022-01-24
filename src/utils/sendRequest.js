import axios from 'axios';

const sendRequest = async (request) => {
  try {
    const { method, pathname, token, data, query } = request;
    const queryString = query
      ? `?${Object.entries(query)
          .map(([key, val]) => `${key}=${val}`)
          .join('&')}`
      : '';
    const headers = token && { authorization: `Bearer ${token}` };
    const url = `${process.env.SERVER_HOSTNAME}/${pathname}${queryString}`;
    const res = await axios({ method, url, headers, data });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default sendRequest;
