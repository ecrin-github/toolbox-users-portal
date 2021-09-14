import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersPanelComponent } from './filters-panel.component';
import {MatDividerModule} from '@angular/material/divider';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {RouterModule} from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';

import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {SubcategoriesComponent} from './subcategories/subcategories.component';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    FiltersPanelComponent,
    CategoriesComponent,
    SubcategoriesComponent,
  ],
    imports: [
        CommonModule,
        MatDividerModule,
        TranslateModule,
        MatButtonModule,
        MatCheckboxModule,
        FormsModule,
        MatExpansionModule,
        MatSnackBarModule,
        PerfectScrollbarModule,
        RouterModule,
        MatTreeModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ],
  exports: [
    FiltersPanelComponent,
    CategoriesComponent,
    SubcategoriesComponent,
  ],
})
export class FiltersPanelModule { }
