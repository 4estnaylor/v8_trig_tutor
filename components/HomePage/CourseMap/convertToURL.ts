const convertToURL = (string: string) => {
  let splitArray = string.split(' ');
  let newURL = splitArray.join('_');
  return newURL;
};

export default convertToURL;
