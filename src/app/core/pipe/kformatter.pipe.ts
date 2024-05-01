import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kformatter',
  standalone: true
})
export class KformatterPipe implements PipeTransform {

  transform(value: any): string {
    const val: number = Number(value);
    if(val > 0 && val < 999) {
      return `${parseFloat(val.toFixed(2))}`;
    } else if (val > 999 && val < 999999) {
      const r = (val/1000);
      console.log(r)
      if(r%1 == 0) {
        return `${r}K`;
      } else {
        return `${r.toFixed(1)}K`;
      }
      
    } else if (val > 999999 && val < 999999999) {
      let r = (val/1000000);
      if(r%1 == 0) {
        return `${r}K`;
      } else {
        return `${r.toFixed(1)}K`;
      }
    }

    return "-";
  }

}
