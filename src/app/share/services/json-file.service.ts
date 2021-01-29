import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonFileService {
  readJsonFile(filePath) {
    return of()
    // return jsonfile.readFile(filePath).asObservable();
  }

  writeJsonFile(filePath, json) {
    return of()
    // return jsonfile.readFile(filePath, json).asObservable();
  }
}
