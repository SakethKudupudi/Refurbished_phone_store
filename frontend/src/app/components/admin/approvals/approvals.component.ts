import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentService, Component as ProductComponent } from '../../../services/component.service';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {
  pendingComponents: ProductComponent[] = [];
  loading: boolean = false;

  constructor(private componentService: ComponentService) {}

  ngOnInit() {
    this.loadPendingApprovals();
  }

  loadPendingApprovals() {
    this.loading = true;
    this.componentService.getPendingApprovalsRest().subscribe({
      next: (components) => {
        this.pendingComponents = components;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading pending approvals:', error);
        this.loading = false;
      }
    });
  }

  approveComponent(component: ProductComponent) {
    if (confirm(`Are you sure you want to approve "${component.name}"?`)) {
      this.componentService.approveComponentRest(component.id!).subscribe({
        next: () => {
          alert('Component approved successfully!');
          this.loadPendingApprovals(); // Reload list
        },
        error: (error) => {
          console.error('Error approving component:', error);
          alert('Failed to approve component. Please try again.');
        }
      });
    }
  }

  rejectComponent(component: ProductComponent) {
    const reason = prompt(`Please enter rejection reason for "${component.name}":`);
    if (reason) {
      this.componentService.rejectComponentRest(component.id!, reason).subscribe({
        next: () => {
          alert('Component rejected successfully!');
          this.loadPendingApprovals(); // Reload list
        },
        error: (error) => {
          console.error('Error rejecting component:', error);
          alert('Failed to reject component. Please try again.');
        }
      });
    }
  }

  deleteComponent(component: ProductComponent) {
    if (confirm(`Are you sure you want to permanently delete "${component.name}"?`)) {
      this.componentService.deleteComponentRest(component.id!).subscribe({
        next: () => {
          alert('Component deleted successfully!');
          this.loadPendingApprovals(); // Reload list
        },
        error: (error) => {
          console.error('Error deleting component:', error);
          alert('Failed to delete component. Please try again.');
        }
      });
    }
  }
}
