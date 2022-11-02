import queryStringify from "../utils/queryStringify";

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE"
};

interface Options {
  method: string,
  data: any,
  timeout: number,
  headers: Record<string, string>,
  tries: number,
}

export default class HTTPTransport {
  fetchWithRetry(url: string, options: Options): Promise<XMLHttpRequest | Response> {
    const {tries = 1} = options;
  
    const onError = (err: Error) =>{
      const triesLeft = tries - 1;
      if (!triesLeft){
        throw err;
      }
  
      return this.fetchWithRetry(url, {...options, tries: triesLeft});
    }
  
    return this.request(url, options).catch(onError);
  } 

  get = (url: string, options: Options): Promise<XMLHttpRequest | Response> => {
    let query = '';
    if (options.data) {
      query = queryStringify(options.data);
    }
    return this.fetchWithRetry(url + query, { ...options, method: METHODS.GET });
  };

  post = (url: string, options: Options): Promise<XMLHttpRequest | Response> => {
    return this.fetchWithRetry(url, {...options, method: METHODS.POST});
  };

  put = (url: string, options: Options): Promise<XMLHttpRequest | Response> => {
    return this.fetchWithRetry(url, {...options, method: METHODS.PUT});
  };

  delete = (url: string, options: Options): Promise<XMLHttpRequest | Response> => { 
    return this.fetchWithRetry(url, {...options, method: METHODS.DELETE});
  };
  
  request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
    const {headers = {}, method, data} = options;
    
    return new Promise((resolve, reject) => {
      if (!method) {
        reject("No method");
        return;
      }
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      
      if (headers) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
      
      xhr.onload  = () => {
        resolve(xhr);
      };

      xhr.onabort =reject;
      xhr.onerror = reject;
      
      xhr.timeout = timeout; 
      xhr.ontimeout = reject;
        
      if (!data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
