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

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>

export default class HTTP {
  static BASE_URL = "https://ya-praktikum.tech/api/v2";
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTP.BASE_URL}${endpoint}`;
  }

  fetchWithRetry (url: string, options: Options): Promise<XMLHttpRequest> {
    const {tries = 1} = options;
  
    const onError = (err: Error) =>{
      const triesLeft = tries - 1;
      if (!triesLeft){
        throw err;
      }
  
      return this.fetchWithRetry(url, {...options, tries: triesLeft});
    }
  
    return this.request(url, options).catch(onError) as Promise<XMLHttpRequest>;
  } 

  get: HTTPMethod = (path: string, options = {}) => {
    let query = '';
    if (options.data) {
      query = queryStringify(options.data);
    }
    return this.fetchWithRetry(this.endpoint + path + query, { ...options, method: METHODS.GET });
  };

  post: HTTPMethod = (path: string, options = {}) => {
    return this.fetchWithRetry(this.endpoint + path, {...options, method: METHODS.POST});
  };

  put: HTTPMethod = (path: string, options = {}) => {
    return this.fetchWithRetry(this.endpoint + path, {...options, method: METHODS.PUT});
  };

  delete: HTTPMethod = (path: string, options = {}) => { 
    return this.fetchWithRetry(this.endpoint + path, {...options, method: METHODS.DELETE});
  };
  
  request = (url: string, options: Options, timeout = 5000) => {
    const {headers = {}, method, data} = options;
    
    return new Promise((resolve, reject) => {
      if (!method) {
        reject("No method");
        return;
      }
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
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
