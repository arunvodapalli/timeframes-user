import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})


export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {

    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (item) {
      console.log(item)
      console.log(args)
      return item.description.toLowerCase().includes(args);
    });
  }
}