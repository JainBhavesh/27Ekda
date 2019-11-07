import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (!items || !value) {
      return items;
    }
    return items.filter(
      it => it.first_name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

}
