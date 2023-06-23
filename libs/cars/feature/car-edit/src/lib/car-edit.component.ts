import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { carEditActions, carQuery } from '@m-benz/cars/data-access';
import { FormErrorComponent } from '@m-benz/ui';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mbenz-car-edit',
  standalone: true,
  templateUrl: './car-edit.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    FormErrorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarEditComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  car$ = this.store.select(carQuery.selectEntity);
  isLoading$ = this.store.select(carQuery.selectLoading);
  isLoaded$ = this.store.select(carQuery.selectLoaded);
  form = this.fb.group({
    id: ['', Validators.required],
    car_id: ['', Validators.required],
    instock: [false, Validators.required],
    hp: ['', [Validators.required, Validators.min(100), Validators.max(550)]],
    price: ['', [Validators.required, Validators.min(0)]],
    color: ['', Validators.required],
  });

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store
      .select(carQuery.selectEntity)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.form.setValue(data);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  navigateTo() {
    this.router.navigate(['/cars']);
  }

  onSubmit(event: Event) {
    this.store.dispatch(
      carEditActions.updateCar({
        payload: {
          id: this.form.value.id || '',
          car_id: this.form.value.car_id || '',
          instock: this.form.value.instock || false,
          hp: this.form.value.hp || '',
          price: this.form.value.price || '',
          color: this.form.value.color || '',
        },
      })
    );
  }
}
