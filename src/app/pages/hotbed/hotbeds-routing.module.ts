import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HotbedComponent } from "./hotbeds.component";
import { CreateHotbedComponent } from "./create/create-hotbed.component";

const routes: Routes = [{
    path: '',
    component: HotbedComponent,
    children: [{
        path: 'create',
        component: CreateHotbedComponent,
    }],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class HotbedRoutingModule {

}

export const routedComponents = [
    HotbedComponent,
    CreateHotbedComponent,
];
