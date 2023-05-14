import {getCurrencySymbol} from '@angular/common';

export function phoneToUsername(phone: string) {
  return phone + "@asar-client.kz";
}
export function getOnlyNumbers(str: string) {
  return str.replace(/[^0-9]/g,'');
}

export function hasTwoWords(value: string) {
  return value.split(/\W+/).length === 2;
}

export function maskString(value: string, pattern: string) {
  let i = 0;
  const v = value.toString();
  return pattern.replace(/#/g, _ => v[i++]);
}

export function getTengeSymbol() {
  return getCurrencySymbol('KZT', 'narrow');
}