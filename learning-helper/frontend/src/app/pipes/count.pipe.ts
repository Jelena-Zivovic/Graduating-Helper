import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count',
  pure: false
})
export class CountPipe implements PipeTransform {

  transform(subjects: any[]): number {
    return subjects.length;
  }

}
