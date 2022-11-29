import queryStringify from "../utils/queryStringify";

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE"
};

interface Options {
  method?: string,
  data?: any,
  timeout?: number,
  headers?: Record<string, string>,
  tries?: number,
  mode?: string
  credentials?: string
}

const baseURL = "https://ya-praktikum.tech/api/v2";

export default class HTTP {
  fetchWithRetry<ResponseType> (url: string, options: Options): Promise<XMLHttpRequest | ResponseType | unknown> {
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

  get = <ResponseType>(url: string, options: Options): Promise<XMLHttpRequest | ResponseType | unknown> => {
    let query = '';
    if (options.data) {
      query = queryStringify(options.data);
    }
    return this.fetchWithRetry(url + query, { ...options, method: METHODS.GET });
  };

  post = <ResponseType>(url: string, options: Options): Promise<XMLHttpRequest | ResponseType | unknown> => {
    return this.fetchWithRetry(url, {...options, method: METHODS.POST});
  };

  put = <ResponseType>(url: string, options: Options): Promise<XMLHttpRequest | ResponseType | unknown> => {
    return this.fetchWithRetry(url, {...options, method: METHODS.PUT});
  };

  delete = <ResponseType>(url: string, options: Options): Promise<XMLHttpRequest | ResponseType | unknown> => { 
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

      xhr.open(method, baseURL + url);
      xhr.withCredentials = true;
      
      if (headers) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
      
      xhr.onload  = () => {
        resolve(xhr);
      };

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            const contentType = xhr.getResponseHeader("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              resolve(JSON.parse(xhr.response));
            } else {
              resolve(xhr.response );
            }
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort =reject;
      xhr.onerror = reject;
      
      xhr.timeout = timeout; 
      xhr.ontimeout = reject;
        
      if (!data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
