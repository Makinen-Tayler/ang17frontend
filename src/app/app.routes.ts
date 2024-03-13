import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: 'landing', component: LandingComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', component: PageNotFoundComponent },

];
