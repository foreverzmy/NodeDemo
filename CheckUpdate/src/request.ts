import fetch, { RequestInit } from 'node-fetch';

const cookie = '___bz=672340|38805323|2c6811|aladin2_freexx;';

const request = async (url: string, params?: {}) => {
  const option: RequestInit = {
    method: 'GET',
    headers: {
      Cookie: cookie
    }
  }

  params = '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
  url = encodeURI(url + params);
  const response = await fetch(url, option);
  if (response.status === 200) {
    return await response.json();
  } else {
    console.log(url + params);
    return request(url);
  }
}

export default request;