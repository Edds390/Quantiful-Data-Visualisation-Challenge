const generateRandomColour = () => `#${((Math.random()) * 0xFFFFBB << 0).toString(16)}`;

export default generateRandomColour;
