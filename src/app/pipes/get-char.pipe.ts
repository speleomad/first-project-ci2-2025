import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getChar'
})
export class GetCharPipe implements PipeTransform {

  transform(value: string, position: number): string{
     if(position && position<value.length)
       return value.charAt(position);
    return  value.charAt(0);
  }

}
