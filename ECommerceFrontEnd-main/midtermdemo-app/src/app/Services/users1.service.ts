import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Users} from '../Models/users1.model';

const baseUrl = 'http://localhost:8181/api/User/users';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<Users[]> {
        return this.http.get<Users[]>(baseUrl);
    }

    get(id: any): Observable<Users> {
        return this.http.get<Users>(`${baseUrl}/${id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl,data);
    }

    update(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`,data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(baseUrl);
    }

    findByName(name: any): Observable<Users[]> {
        return this.http.get<Users[]>(`${baseUrl}?name=${name}`);
      }
}