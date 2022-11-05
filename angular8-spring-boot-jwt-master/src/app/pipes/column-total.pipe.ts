import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnTotal'
})
export class ColumnTotalPipe implements PipeTransform {

  transform(items: any[], searchText: string): any {
    if(!items) return [];
    if(!searchText) return items;
    let sum=0;
//searchText = searchText.toLowerCase();
for(let bal of items){
  if(bal[searchText]!=0)
  sum+=bal[searchText];
}
return sum;
}
}
