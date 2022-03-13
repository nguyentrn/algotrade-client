import chroma from 'chroma-js';

const getTokenAlphaColor = (color) => (color ? chroma(color).brighten(1).alpha(0.2).hex() : '#f4f4f4');

export default getTokenAlphaColor;
