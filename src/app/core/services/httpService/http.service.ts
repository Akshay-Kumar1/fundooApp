import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // <<<----------------------Notes Services---------------------->>>
  formEncoded(url,body){
    
    url = environment.baseUrl+url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
   
      })
    };
    return this.http.post(url,this.getFormUrlEncoded(body),httpOptions)
  }
  
  jsonGet(url)
  {
    url = environment.baseUrl + url;
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        
      })
    };
    return this.http.get(url,httpOptions);
  }
  jsonDelete(url)
  {
    url = environment.baseUrl + url;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        
      })
    };
    return this.http.delete(url);
  }
  
// <<--------------------User Services------------------>>

postService(url,body) {
    url = environment.baseUrl+url;
    return this.http.post(url,body);
  }
getService(url) {
  url=environment.baseUrl+url
  return this.http.get(url);  
}

jsonPost(url,body)
{
  url = environment.baseUrl + url;

  const httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
     
    })
  };
  return this.http.post(url,body,httpOptions);
}

postLogout(url) {
  url = environment.baseUrl + url;
  
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    
    })
  };
  return this.http.post(url, {}, httpOptions)
}

resetConfig(url, body) {
  
  url = environment.baseUrl + url;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    
    })
  }
  return this.http.post(url, this.getFormUrlEncoded(body), httpOptions)
}

postReset(url,body) {
  url = environment.baseUrl+url;

  const httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json",
     
    })
  }
  return this.http.post(url,body,httpOptions);

}

httpAddImage(url,body,token){
  url = environment.baseUrl + url;
  var httpOptions={
    headers:new HttpHeaders({

    })
  };
  return this.http.post(url,body,httpOptions)
}

  getFormUrlEncoded(toConvert) 
  {
    const formBody = [];
    for (const property in toConvert) 
    {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

 
}
