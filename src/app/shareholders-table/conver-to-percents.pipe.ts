import { Pipe, PipeTransform } from '@angular/core';
import { ShareType } from '../common/models/shareholder.model';

@Pipe({
  name: 'converToPercents'
})
export class ConverToPercentsPipe implements PipeTransform {

  transform(
    value: number,
    shareType: { type: ShareType, cost: number, totalCost: number },
    typeColumnsDisplayUnit: Partial<Record<ShareType, 'number' | 'percents'>>
  ): string | number {
    if (typeColumnsDisplayUnit[shareType.type] === 'number') {
      return value ?? 0;
    } else {
      const totalValue = shareType.totalCost / shareType.cost
      return (((value / totalValue) ?? 0) * 100).toFixed(2) + '%';
    }
  }

}
