import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppAlarmService {

    private messageSource = new BehaviorSubject<string>('default message');
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(message: string) {
        this.messageSource.next(message);
    }
}
