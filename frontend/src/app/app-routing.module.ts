import { NgModule } from "@angular/core";
import { Route , RouterModule } from "@angular/router";

import { LoginPageComponent } from "./pages/login/login-page/login-page.component";

const routes:Route[] = [
    {path:"login",component:LoginPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    
})

export class AppRoutingModule {}