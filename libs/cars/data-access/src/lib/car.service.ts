import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@m-benz/core/http-client';
import { Car } from '@m-benz/data-models';

@Injectable({ providedIn: 'root' })
export class CarsService {
  constructor(private apiService: ApiService) {}

  getCars(): Observable<Car[]> {
    return this.apiService.get<Car[]>('/cars');
  }

  getCar(slug: string): Observable<Car> {
    return this.apiService.get<Car>('/cars/' + slug);
  }

  updateCar(data: Car): Observable<Car> {
    return this.apiService.put<Car, Car>('/cars/' + data.id, data);
  }
}
