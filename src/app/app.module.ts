import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes-page/notes/notes.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent, data: { Title: 'Login' } },
  { path: 'notes', component: NotesComponent, data: { Title: 'notes' } },
];
@NgModule({
  declarations: [AppComponent, NotesComponent, ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
