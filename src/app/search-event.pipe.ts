import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEvent'
})
export class SearchEventPipe implements PipeTransform {

  transform(value: any, term: string): any {
    if (!value || !term) return value;

    term = term.toLocaleLowerCase();

    return value.filter((item: any) => {
      let name = item.name.toLocaleLowerCase();

      if (name.includes(term)) {
        return item;
      }
    })
  }

}
