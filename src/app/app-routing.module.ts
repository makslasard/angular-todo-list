import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { UpdateTaskComponent } from "./pages/update-task/update-task.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "id",
    component: UpdateTaskComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
