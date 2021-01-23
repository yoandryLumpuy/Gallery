import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MyErrorHandler implements ErrorHandler {
    constructor(){}

    handleError(error: any): void {
        let errorsSummary = '';
        if (error instanceof HttpErrorResponse){           
           if (error.error instanceof Array){
                for(const key in error.error)
                    errorsSummary += !!error.error[key].description ? error.error[key].description + '\n' : '';              
           }
           if (typeof(error.error) == 'string') 
            errorsSummary += error.error;                  
        }        
        //this.alertify.error();
        console.log(errorsSummary || error.error?.statusText || 'An error has occured !');
    }
}