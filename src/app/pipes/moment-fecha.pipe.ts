import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentFecha'
})
export class MomentFechaPipe implements PipeTransform {

  transform(created: Date | moment.Moment, dateFormat: Date): any {
    return moment().format('DD/MM/YYYY');
}

}
