import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { NgxPaginationModule } from "ngx-pagination";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HeaderComponent } from "./components/header/header.component";

import { HomeComponent } from "./pages/home/home.component";
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { SearchTaskComponent } from "./components/search-task/search-task.component";
import { ListTaskComponent } from "./components/list-task/list-task.component";
import { SortTaskComponent } from "./components/sort-task/sort-task.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { FilterTaskPipe } from './pipes/filter-task.pipe';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UpdateTaskComponent } from './pages/update-task/update-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CreateTaskComponent,
    SearchTaskComponent,
    ListTaskComponent,
    SortTaskComponent,
    PaginationComponent,
    FilterTaskPipe,
    NotFoundComponent,
    UpdateTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
