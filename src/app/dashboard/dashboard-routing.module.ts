import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectManagementComponent} from '@app/dashboard/pages/project-management/project-management.component';
import { CpGraphComponent } from './pages/product/cp-graph/cp-graph.component';
import { CpRemoteComponent } from './pages/product/cp-remote/cp-remote.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
    {
        path: '', component: ProjectManagementComponent,
    },
    {
        path: 'project-management', component: ProjectManagementComponent,
    },
    {
        path: 'products', component: ProductComponent,
        children: [
            {
                path: '', component: CpGraphComponent
            },
            {
                path: 'cp', component: CpGraphComponent
            },
            {
                path: 'cp/graph', component: CpGraphComponent
            },
            {
                path: 'cp/remote', component: CpRemoteComponent
            },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
