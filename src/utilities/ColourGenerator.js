const generateRandomColour = () => `#${((Math.random()+0.2) * 0xFFFFFF << 0).toString(16)}`;

export default generateRandomColour;
