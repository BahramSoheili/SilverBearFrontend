import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http'
import { ComputerModel } from '../models/ComputerModel'
import { ConstantsService } from '../services/constant.service'


@Injectable({
  providedIn: 'root'
})

export class ComputerApiService {  
  actionUrl: string
  computer$ : Observable<ComputerModel[]>
  constructor(private http: HttpClient, 
              private constantsService: ConstantsService) {
                this.actionUrl = this.constantsService.managerServerApiUrl 
                + 'Computers';
                console.log(this.actionUrl);              
              }
  getAll$(): Observable<ComputerModel[]> {
      console.log("Get all computers")
      var url = this.actionUrl+"/search"
      console.log(url)
      return this.http.get<ComputerModel[]>(url)
  }
  getListAll$(): Observable<ComputerModel[]> {
    console.log("Get all computers")
    var url = this.actionUrl+"/search"
    console.log(url)
    return this.http.get<ComputerModel[]>(url)
  }
  getComputer$(id: number): Observable<ComputerModel> {
      return this.http.get<ComputerModel>(this.actionUrl+"/"+id);
  }

  add$(computerView: ComputerModel): any {
    console.log('Computer = ', computerView)
    return this.http.post(this.actionUrl, computerView)
  }

  update$(computerView: ComputerModel): any {
    console.log('Computer = ', computerView)
    return this.http.put(this.actionUrl + computerView.id, computerView)
  }

  delete$(id: number): any {
      return this.http.delete(this.actionUrl + id);
  }
}
@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req);
    }
}
