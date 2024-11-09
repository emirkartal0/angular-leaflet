import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateTime',
    standalone: true,
})
export class DateTimePipe implements PipeTransform {
    transform(date: Date): string {
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let hours = date.getHours().toString().padStart(2, '0');
		let minutes = date.getMinutes().toString().padStart(2, '0')

        return `${day}/${month}/${date.getFullYear()}  ${hours}:${minutes}`;
    }
}
