import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import {
    NgbDropdownModule, NgbPopoverModule,
    NgbProgressbarModule, NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from '../modules/i18n/translation.module';
import { LayoutComponent } from './_layout/layout.component';
import { ScriptsInitComponent } from './_layout/init/scipts-init/scripts-init.component';
import { HeaderMobileComponent } from './_layout/components/header-mobile/header-mobile.component';
import { FooterComponent } from './_layout/components/footer/footer.component';
import { HeaderComponent } from './_layout/components/header/header.component';
import { HeaderMenuComponent } from './_layout/components/header/header-menu/header-menu.component';
import { TopbarComponent } from './_layout/components/topbar/topbar.component';
import { ExtrasModule } from '../_portal/partials/layout/extras/extras.module';
import { LanguageSelectorComponent } from './_layout/components/topbar/language-selector/language-selector.component';
import { CoreModule } from '../_portal/core';
import {MatDividerModule} from '@angular/material/divider';
import {FiltersPanelModule} from '../_portal/partials/layout/extras/filters-panel/filters-panel.module';
import {RouterModule} from '@angular/router';
import {ResourcePageComponent} from './resource-page/resource-page.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MainPageComponent} from './main-page/main-page.component';
import {MainPageContentModule} from '../_portal/partials/content/portal/main-page-content.module';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,

    MainPageComponent,
    ResourcePageComponent,
  ],
    imports: [
        CommonModule,
        TranslationModule,
        InlineSVGModule,
        ExtrasModule,
        NgbDropdownModule,
        NgbProgressbarModule,
        CoreModule,
        MatDividerModule,
        MatExpansionModule,
        MatIconModule,
        NgbTooltipModule,

        FiltersPanelModule,
        MainPageContentModule,

        RouterModule.forChild([
            {
                path: '',
                component: MainPageComponent
            },
            {
                path: 'resource/:id',
                component: ResourcePageComponent
            },
        ]),
        FormsModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatListModule,
        NgbPopoverModule,

    ],
})
export class MainModule { }
