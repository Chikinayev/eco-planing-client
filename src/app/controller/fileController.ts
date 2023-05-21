import {Injectable} from "@angular/core";
import {HttpService} from "../lib/http.service";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class FileController {

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('file')
  }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.toPostService0<string>('/upload', formData);
  }

}
