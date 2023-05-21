import {HttpHeaders} from '@angular/common/http';

interface KeyValue {
  key: string;
  value: string;
}

export class OptionsBuilder {
  private appendingHeaders: KeyValue[] = [];
  private appendingParams: KeyValue[] = [];

  public appendHeader(key: string, value: string): void {
    if (value !== undefined) {
      this.appendingHeaders.push({key, value});
    }
  }

  public appendParam(key: string, value: string): void {
    if (value !== undefined) {
      this.appendingParams.push({key, value});
    }
  }

  public get headers(): HttpHeaders {
    const ret: { [name: string]: string | string[] } = {};
    this.appendingHeaders.forEach(h => {
      ret[h.key] = h.value;
    });
    return new HttpHeaders(ret);
  }

  public get params(): { [name: string]: string | string[]; } {
    const ret: { [name: string]: string | string[] } = {};
    this.appendingParams.forEach(h => {
      ret[h.key] = h.value;
    });
    return ret;
  }

  public get paramsAsString(): string {

    const data = new URLSearchParams();

    this.appendingParams.forEach(h => {

      if (h.value !== undefined && h.value !== null) {
        data.append(h.key, h.value);
      }

    });

    return data.toString();
  }

  appendParamsFromKeyValue(keyValue: { [p: string]: any }): void {
    keyValueAppender(keyValue, (key, value) => this.appendParam(key, value));
  }
}

const keyValueAppender = (keyValue: { [p: string]: any }, appendFunc: (key: string, value: string) => void) => {
  if (!keyValue) {
    return;
  }

  // eslint-disable-next-line guard-for-in
  // tslint:disable-next-line:forin
  for (const key in keyValue) {
    const value = keyValue[key];

    if (value === undefined || value === null) {
      continue;
    }

    if (typeof value === 'string') {
      appendFunc(key, value as string);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      appendFunc(key, '' + value);
    } else if (value instanceof Date) {
      appendFunc(key, '' + (value as Date).getTime());
    } else if (typeof value === 'object') {
      appendFunc(key, JSON.stringify(value, (k, v) => v ?? null)); // do not loose undefined fields
    } else {
      throw new Error('Unknown type of parameter `' + key + '` : typeof value = `'
        + (typeof value) + '` : value = `' + value + '`');
    }

  }

};
