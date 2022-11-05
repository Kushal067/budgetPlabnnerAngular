import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any, field: string): any[] {

    if(!array)
    return null;
    if(field=='date'){
      array.sort((a: any, b: any) => { return  Date.parse(b[field])-Date.parse(a[field]) });
      return array;
    }
    else{
      array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }

  }
}
