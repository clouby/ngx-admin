import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotbedComponent } from './hotbeds.component';
import { CreateHotbedComponent } from './create/create-hotbed.component';
import { ViewActivityComponent } from './view-activity/view-activity.component';

const routes: Routes = [{
    path: '',
    component: HotbedComponent,
    children: [
        {
            path: 'create',
            component: CreateHotbedComponent,
        },
        {
            path: 'view-activity',
            component: ViewActivityComponent,
        },
    ],
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
    ViewActivityComponent,
];
