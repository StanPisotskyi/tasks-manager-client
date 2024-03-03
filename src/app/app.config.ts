import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(NgbModule),
    provideAnimationsAsync(),
    importProvidersFrom(CKEditorModule),
  ]
};
