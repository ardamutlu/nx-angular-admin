import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { carListActions, carListQuery } from '@m-benz/cars/data-access';
import { Car } from '@m-benz/data-models';

@Component({
  selector: 'mbenz-car-list',
  standalone: true,
  templateUrl: './car-list.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarListComponent implements AfterViewInit {
  cars$ = this.store.select(carListQuery.selectEntities);
  isLoading$ = this.store.select(carListQuery.selectLoading);
  isLoaded$ = this.store.select(carListQuery.selectLoaded);
  error$ = this.store.select(carListQuery.selectError);

  displayedColumns: string[] = [
    'id',
    'car_id',
    'instock',
    'hp',
    'price',
    'color',
    'action',
  ];
  dataSource = new MatTableDataSource<Car>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly store: Store, private readonly router: Router) {
    this.store.dispatch(carListActions.loadCars());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  navigateTo(slug: string) {
    this.router.navigate(['/cars/', slug]);
  }
}
