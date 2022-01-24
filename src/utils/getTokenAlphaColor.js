import chroma from 'chroma-js';

const getTokenAlphaColor = (color) => chroma(color).brighten(1).alpha(0.2).hex();

export default getTokenAlphaColor;
