import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateLastTickers } from '../redux/marketSlice';

const endpoint = process.env.BINANCE_SOCKET_HOSTNAME;
const streams = ['!miniTicker@arr'];

const connectSocket = () => {
  var ws = new WebSocket(endpoint);
  ws.onopen = function () {
    ws.send(
      JSON.stringify({
        method: 'SUBSCRIBE',
        params: streams,
        id: 1,
      })
    );
  };

  ws.onclose = function (e) {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(function () {
      connectSocket();
    }, 1000);
  };

  ws.onerror = function (err) {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    ws.close();
  };

  return ws;
};

const useSocket = () => {
  const socketRef = useRef();
  const dispatch = useDispatch();

  // init
  useEffect(() => {
    const ws = connectSocket();
    ws.onmessage = function (e) {
      const response = JSON.parse(e.data);
      if (response) {
        const { stream, data } = response;
        if (stream === '!miniTicker@arr') {
          dispatch(updateLastTickers(data));
        }
      }
    };
    // const newSocket = io('localhost:3333', {
    //   reconnectionDelayMax: 1e4,
    // });
    // socketRef.current = newSocket;
    return () => ws.close();
  }, []);

  return socketRef.current;
};

export default useSocket;
