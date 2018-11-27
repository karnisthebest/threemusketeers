import { HttpClient } from '@angular/common/http';
import {Injectable, Pipe, PipeTransform} from '@angular/core';
//let format = require("date-fns/format");

@Pipe({
  name: 'dateformat'
})

/*
  Generated class for the DateServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DateServiceProvider Provider');
  }

}

//@Injectable()
// export class DateFormatPipe implements PipeTransform {
//   transform(d: Date | string, fmt: string): string {
//     // let rv = format(d, fmt);
//     // return rv;
//   }
//}