import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    console.log(filterString)

    // if(value.length===0 || filterString === ''){
    if (value === null && value.length < 1 || (filterString === '' || filterString === undefined)) {

      return value;
    }
    const resultArray = [];
    for(const item of value){
      filterString = filterString.toLowerCase();
      // if(item[propName] === filterString){
      if (item[propName].toLowerCase().indexOf(filterString) >= 0) {

        resultArray.push(item);
      }

      console.log(resultArray)
      
    }
    return resultArray;

  }

}
