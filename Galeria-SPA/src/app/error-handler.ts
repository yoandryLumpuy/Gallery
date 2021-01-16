import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import { AlertifyService } from './_services/alertify.service';

@Injectable({providedIn: 'root'})
export class MyErrorHandler implements ErrorHandler {
    constructor(private alertify : AlertifyService){}

    handleError(error: any): void {
        let errorsSummary = '';
        if (error instanceof HttpErrorResponse){           
           if (error.error instanceof Array){
                for(const key in error.error)
                    errorsSummary += error.error[key].description ? error.error[key].description + '\n' : '';              
           }
           if (typeof(error.error) == 'string') 
            errorsSummary += error.error;                  
        }        
        this.alertify.error(errorsSummary || 'An error has occured !');
    }
}