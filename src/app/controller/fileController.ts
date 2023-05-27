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
    console.log('qqqqqq');
    return this.http.postFile<string>('upload', file);
  }

  downloadFile(fileId: string) {
    console.log('asdddddddd');
    return this.http.downloadFile('download', {fileId})
  }

}
