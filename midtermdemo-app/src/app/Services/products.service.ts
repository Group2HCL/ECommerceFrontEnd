import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Products} from '../Models/products.model';

const baseUrl = 'http://localhost:8181/api/Product/products';
const ADD_API = "http://localhost:8181/api/ShoppingCart/shoppingCart/addProduct";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<Products[]> {
        return this.http.get<Products[]>(baseUrl);
    }

    get(id: any): Observable<Products> {
        return this.http.get<Products>(`${baseUrl}/${id}`);
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

    findByName(name: any): Observable<Products[]> {
        return this.http.get<Products[]>(`${baseUrl}?name=${name}`);
      }

    addToCart(id: any) {
        this.http.get(`${ADD_API}/${id}`);
      }
}