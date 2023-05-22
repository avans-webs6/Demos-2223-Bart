import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEvent'
})
export class SearchEventPipe implements PipeTransform {

  transform(value: any, term: string): any {
    if (!value || !term) return value;

    return value.filter((item: any) => {
      if (item.name.includes(term)) {
        return item;
      }
    })
  }

}
