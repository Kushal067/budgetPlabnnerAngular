import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTour'
})
export class SortTourPipe implements PipeTransform {

  transform(array: any, field: number): any {

    if(!array)return null;
    if(!field){

      return array;
    }
    if(field==2){
      return array.filter(function(data){

        return JSON.stringify(data)['active']==true;
    });
    }
    else if(field==3){
      console.log("fucked up3")
      return array.filter(function(data){
        console.log(data);
        return JSON.stringify(data)['active']==false;
    });
    }
    else{

      return array;
    }
    return null;
  }

}
