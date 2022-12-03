const convertToURL = (string: string) => {
  let splitArray = string.split(' ');
  let newURL: string = splitArray.join('_');
  newURL = encodeURIComponent(newURL);
  let newURLArray = newURL.split('%2F');
  newURL = newURLArray.join('/');
  // console.log(newURL);
  return newURL;
};

export default convertToURL;
