import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ComputerComponent } from './computer/computer.component';
import { ComputerListCreateUpdateComponent } from './computer-list-create-update/computer-list-create-update.component';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { ComputerCreateComponent } from './computer-create/computer-create.component';
import { ComputerUpdateComponent } from './computer-update/computer-update.component';
import { ComputerDetailsComponent } from './computer-details/computer-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmCreateComponent } from './confirm-create/confirm-create.component';
import { ConfirmUpdateComponent } from './confirm-update/confirm-update.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ConfirmDeletingComponent } from './confirm-deleting/confirm-deleting.component';
import { MaterialModule } from './material.module';
import { AgGridModule } from 'ag-grid-angular';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { computerEffects } from './store/effects/computerEffects';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './store/reducers/appReducers';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ComputerService } from './services/computer.service';
import { ComputerApiService } from './apiServices/computer-api.service';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    ComputerComponent,
    ComputerListCreateUpdateComponent,
    ComputerListComponent,
    ComputerCreateComponent,
    ComputerUpdateComponent,
    ComputerDetailsComponent,
    ConfirmCreateComponent,
    ConfirmUpdateComponent,
    ErrorDialogComponent,
    ConfirmDeletingComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([computerEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    ComputerService, ComputerApiService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
  
  ],
  exports:[MaterialModule],
  bootstrap: [AppComponent]
})

export class AppModule { }
