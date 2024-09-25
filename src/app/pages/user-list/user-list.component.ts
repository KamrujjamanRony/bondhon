import { Component, inject } from '@angular/core';
import { CoverComponent } from "../../components/shared/cover/cover.component";
import { UserService } from '../../services/user.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CoverComponent, InputsComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  private userService = inject(UserService);
  private dataService = inject(DataService);
  
  filterUsers: any;
  users: any;
  bloodGroups: any;
  selectedBloodGroup: any = '';

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.filterUsers = data;
      this.users = this.filterUsers;
    });
    this.dataService.getJsonData().subscribe(data => {
      this.bloodGroups = data?.bloodGroups;
    });
  }

   // Method to generate PDF
   generatePDF() {
    const doc = new jsPDF();
  
    // Add header text
    const header = (doc: jsPDF) => {
      doc.setFontSize(14);
      doc.text('User Information Report', 105, 15, { align: 'center' });
      doc.setFontSize(10);
      doc.text(`Blood Group: ${this.selectedBloodGroup ? this.selectedBloodGroup : 'All'}`, 105, 20, { align: 'center' });
    };
  
    // Format user data into table rows
    const userRows = this.users.map((user: any, sl: number) => [
      sl + 1,
      user.name,
      user.phone,
      user.bloodGroup,
      user.lastDateOfDonate || 'N/A',
      user.occupation,
      user.college || 'N/A',
      user.role
    ]);
  
    // Add header before table
    header(doc);
  
    // Generate table with autoTable
    (doc as any).autoTable({
      head: [['SL', 'Name', 'Phone', 'Blood Group', 'Last Donation', 'Occupation', 'College', 'Role']],
      body: userRows,
      theme: 'grid', // Ensure the grid theme is used for borders
      startY: 25,
      // Customizing the header style to remove background color and apply border
      headStyles: {
        fillColor: [255, 255, 255], // Remove background color by setting it to white
        textColor: [0, 0, 0], // Set the text color to black
        lineWidth: 0.2, // Define border width
        lineColor: [0, 0, 0] // Define border color
      },
      styles: {
        lineWidth: 0.2, // Border thickness for body cells
        lineColor: [0, 0, 0], // Border color for body cells
        halign: 'center', // Horizontal alignment for all cells
      },
      columnStyles: {
        0: { halign: 'center' }, // SL column centered
        1: { halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'center' },
        4: { halign: 'center' },
        5: { halign: 'center' },
        6: { halign: 'center' },
        7: { halign: 'center' }
      }
    });
  
    // Save the PDF with a filename
    doc.save('user-information.pdf');
  }
  

  onBloodGroupChanged() {
    this.users = this.filterUsers.filter((user: any) => user.bloodGroup === this.selectedBloodGroup);
  }

}
