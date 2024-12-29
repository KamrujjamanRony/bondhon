import { Component, inject } from '@angular/core';
import { CoverComponent } from '../../components/shared/cover/cover.component';
import { InputsComponent } from '../../components/shared/inputs/inputs.component';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';
import { DataService } from '../../services/data.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CoverComponent, InputsComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  private userService = inject(UserService);
  private adminService = inject(AdminService);
  private dataService = inject(DataService);

  filterUsers: any;
  users: any = [];
  model: any;
  divisions: any;
  districts: any;
  bloodGroups: any;
  postPersons: any;

  constructor() {
    this.model = {
      division: '',
      thana: '',
      searchQuery: '',
      from: '',
      to: '',
      postBy: '',
      bloodGroup: ''
    };
  }

  ngOnInit(): void {
    const date = new Date();
    this.getUsers()
    this.model.from = date.toISOString().split('T')[0]
    this.adminService.getAdmin("").subscribe(data => {
      const allAdmin = data;
      this.postPersons = allAdmin.map(p => ({ id: p.name, name: p.name }))
      console.log(this.postPersons);
    });
    this.dataService.getJsonData().subscribe(data => {
      this.divisions = data?.divisions;
      this.bloodGroups = data?.bloodGroups;
    });
  }

  // Method to generate PDF
  generatePDF() {
    const { division, thana, bloodGroup, searchQuery } = this.model;
    const doc = new jsPDF();

    // Add header text
    const header = (doc: jsPDF) => {
      doc.setFontSize(14);
      doc.text('User Information Report', 105, 15, { align: 'center' });
      doc.setFontSize(10);
      doc.text(`Blood Group: ${bloodGroup ? bloodGroup : 'All'}`, 105, 20, { align: 'center' });
    };

    // Format user data into table rows
    const userRows = this.users.map((user: any, sl: number) => [
      sl + 1,
      user.name,
      user.mobileNumber,
      user.bloodGroup,
      user.lastDoneteDate.split("T")[0] || 'N/A',
      user.occupation,
      user.college || 'N/A'
    ]);

    // Add header before table
    header(doc);

    // Generate table with autoTable
    (doc as any).autoTable({
      head: [['SL', 'Name', 'Phone', 'Blood Group', 'Last Donation', 'Occupation', 'College']],
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
        6: { halign: 'center' }
      }
    });

    // Save the PDF with a filename
    // doc.save('user-information.pdf');
    doc.output('dataurlnewwindow');
  }

  getUsers() {
    this.userService.getUser(this.model.division, this.model.thana, this.model.bloodGroup, '', this.model.postBy, this.model.from, this.model.to).subscribe(data => {
      this.users = data;
    });
  }



  onSearch() {
    this.userService.getUser(this.model.searchQuery.trim()).subscribe(data => {
      this.users = data;
    });
  }

  onDivisionChanged() {
    this.model.thana = "";
    this.dataService.getCityByParentId(this.model.division).subscribe(
      data => {
        this.districts = data;
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
    this.getUsers()
  }

}
