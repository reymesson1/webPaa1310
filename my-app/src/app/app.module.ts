import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';


import { DialogOverviewExampleDialog } from './dashboard/dialog-overview-example-dialog';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { ViewScoreComponent } from './view-score/view-score.component';
import { RecapComponent } from './recap/recap.component';
import { HistorialComponent } from './historial/historial.component';
import { LoadingComponent } from './loading/loading.component';
import { FilterPipe } from './filter.pipe';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditVideoComponent } from './edit-video/edit-video.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    DialogOverviewExampleDialog,
    UserComponent,
    RegisterComponent,
    ViewScoreComponent,
    RecapComponent,
    HistorialComponent,
    LoadingComponent,
    FilterPipe,
    ProfileComponent,
    UserListComponent,
    EditVideoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MatToolbarModule, MatIconModule, MatTooltipModule, MatDialogModule, MatTabsModule, FormsModule, MatProgressSpinnerModule],

})
export class AppModule { }
