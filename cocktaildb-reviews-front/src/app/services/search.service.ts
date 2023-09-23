import { Injectable } from '@angular/core';

const SPACE: number = 32;
const TO_LOWERCASE: number = 32;

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor() { }

    fuzzyMatch(term: string, str: string): boolean {
        let termLen = term.length;
        if (termLen == 0) return true;

        let termIndex = 0;
        let strIndex = 0;

        while (termIndex < termLen && strIndex < str.length) {
            let tchar: number = term.charCodeAt(termIndex) | TO_LOWERCASE;
            let schar: number = str.charCodeAt(strIndex) | TO_LOWERCASE;

            if (tchar == schar) {
                termIndex++;
            }

            strIndex++;
        }

        return termIndex == termLen;
    }
}
