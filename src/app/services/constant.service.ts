import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public apiUrl = 'api/'
  public SilverBearServerApi = 'https://localhost:44314/'
  public managerServerApiUrl = this.SilverBearServerApi + 
  this.apiUrl
  public NullRecord = '00000000-0000-0000-0000-000000000000'

}
