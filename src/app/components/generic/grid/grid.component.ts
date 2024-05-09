import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, SelectionChangedEvent } from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AgGridAngular, RouterModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  @Input() rowData: any;
  @Input() colDefs!: ColDef[];
  @Input() routerLink!: string;

  disable = true;

  private currentSelectedNode!: any;

  onRowSelectionChange(event: SelectionChangedEvent<any>): void {
    this.currentSelectedNode = event.api.getSelectedNodes()[0].data;
    this.routerLink = `${this.routerLink}/${this.currentSelectedNode.id}`;
    this.disable = !this.currentSelectedNode;
  }
}
