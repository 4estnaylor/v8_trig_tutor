const convertToURL = (string: string) => {
  let splitArray = string.split(' ');
  let newURL = splitArray.join('_');
  newURL = encodeURIComponent(newURL);
  // console.log(newURL);
  return newURL;
};

export default convertToURL;
