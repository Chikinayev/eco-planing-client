import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {mapBody} from "./RxJsUtil";
import {OptionsBuilder} from "./OptionBuilder";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class HttpService {

  private http: HttpClient;
  protected prefix = '';

  constructor(
    http: HttpClient,
  ) {
    this.http = http;
  }

  setControllerPrefix(controllerPrefix: string):HttpService {
    const service = new HttpService(this.http);
    service.prefix = controllerPrefix
    return service;
  }


  public toGetService<T>(path: string, model?: any): Observable<T> {
    const url = environment.urlPrefix + this.prefix;
    console.log('urll:: ' + url);
    const ob: OptionsBuilder = new OptionsBuilder();

    {
      ob.appendHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    ob.appendParamsFromKeyValue(model);

    return mapBody(this.http.get<T>(url + '/' + path, {
      observe: 'response',
      responseType: 'json',
      headers: ob.headers,
      params: ob.params,
    }));
  }



  public toPostService0<T>(path: string, model?: any): Observable<T> {
    const url = environment.urlPrefix + this.prefix;
    const ob: OptionsBuilder = this.newOptionsBuilder();

    {
      ob.appendHeader('Content-Type', 'application/json');
      ob.appendParamsFromKeyValue(model);
    }

    return mapBody(this.http.post<T>(url + '/' + path, model, {
      observe: 'response',
      responseType: 'json',
      headers: ob.headers,
      params: ob.params,
    }));
  }

  public toPostFileService<T>(path: string, formData: FormData): Observable<T> {
    const url = environment.urlPrefix + this.prefix;
    const ob: OptionsBuilder = this.newOptionsBuilder();

    return mapBody(this.http.post<T>(url + '/' + path, formData, {
      observe: 'response',
      responseType: 'json',
      headers: ob.headers,
      params: ob.params,
    }));
  }






  public downloadFile(path: string, fileId:{[key: string]: any} ): Observable<HttpResponse<Blob>> {
    const url = environment.urlPrefix + this.prefix;
    const ob: OptionsBuilder = this.newOptionsBuilder();
    ob.appendParamsFromKeyValue(fileId)

    return this.http.get(url + '/' + path, {
      observe: 'response',
      responseType: 'blob',
      headers: ob.headers,
      params: ob.params,
    })
  }



  public postFile<T>(path: string, file: File): Observable<T> {
    const url = environment.urlPrefix + this.prefix;
    const ob: OptionsBuilder = this.newOptionsBuilder();
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);

    return mapBody(this.http.post<T>(url + '/' + path, formData, {
      observe: 'response',
      responseType: 'json',
      headers: ob.headers,
      params: ob.params,
    }));
  }


  get token(): string | null {
    return localStorage.getItem('token') || null;
  }

  set token(value: string | null) {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }

  private newOptionsBuilder(): OptionsBuilder {
    const ob = new OptionsBuilder();
    if (this.token) {
      ob.appendHeader('Authorization', 'Bearer_' + this.token);
    }
    return ob;
  }

  public postJson<Input, Result>(
    urlSuffix: string,
    input: Input = {} as Input,
    keyValue?: { [key: string]: any }
  ): Observable<HttpResponse<Result>> {
    const url = environment.urlPrefix + this.prefix;
    const ob: OptionsBuilder = new OptionsBuilder();


    ob.appendHeader('Content-Type', 'application/json');

    ob.appendParamsFromKeyValue(keyValue);

    return this.http.post<Result>(url + '/' + urlSuffix, input, {
      observe: 'response',
      responseType: 'json',
      headers: ob.headers,
      params: ob.params,
    });
  }
}
