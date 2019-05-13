import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RosterServiceService } from './Core/services/roster-service.service';
import { ColorSketchModule } from 'ngx-color/sketch';
import { RosterComponent } from './components/roster/roster.component';
import { HttpErrorInterceptor } from './utilities/errorHandler.interceptor';
import { ColorComponent } from './components/color/color.component';
import {MatSelectModule} from '@angular/material/select';
import { RosterformComponent } from './components/rosterform/rosterform.component';
import { MatDialogModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { RostereditformComponent } from './components/rostereditform/rostereditform.component';
import { ColorformComponent } from './components/colorform/colorform.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { LoginComponent } from './components/login/login/login.component';
import {DemoMaterialModule} from './material-module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/Login/auth.guard';
import { AuthInterceptor } from './Core/services/auth.interceptor';
import 'hammerjs';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
  { path:'home', component:HomeComponent},
  // { path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [ RouterModule ],
  declarations: [
    AppComponent,
    HomeComponent,
    RosterComponent,
    ColorComponent,
    RosterformComponent,
    RostereditformComponent,
    ColorformComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ColorSketchModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatGridListModule,
    DemoMaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents:[
    RosterformComponent,
    RostereditformComponent,
    ColorformComponent],
  providers: [RosterServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
