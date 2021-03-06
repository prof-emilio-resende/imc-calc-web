export default class HttpUtil {
  constructor() {}

  get(hostname, url, obj) {
    return fetch(`${hostname}${url}`);
  }

  post(hostname, url, obj) {
    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(obj)
    };
    
    return fetch(`${hostname}${url}`, options);
  }
}
