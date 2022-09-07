import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filteredValue:string ) {
    if(filteredValue === ''){
      return value;
    }

    const todos = value.filter((val:any) => val.title.toLowerCase().includes(filteredValue.toLocaleLowerCase()));
    return todos;
  }
}
