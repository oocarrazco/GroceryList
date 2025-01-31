import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { GroceryListComponent } from './app/app.component';

bootstrapApplication(GroceryListComponent, appConfig)
  .catch((err) => console.error(err));
