import chroma from 'chroma-js';

const getTokenAlphaColor = (color, brighten = 1, alpha = 0.2) =>
  color ? chroma(color).brighten(brighten).alpha(alpha).hex() : '#f4f4f4';

export default getTokenAlphaColor;
