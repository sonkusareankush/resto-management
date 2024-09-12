import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase',
  standalone: true
})
export class SentenceCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Trim any whitespace and convert the first letter of the first word to uppercase, and the rest to lowercase
    value = value.trim().toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
