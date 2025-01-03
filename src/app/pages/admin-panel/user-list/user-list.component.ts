import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CoverComponent } from '../../../components/shared/cover/cover.component';
import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { AdminService } from '../../../services/admin.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { InputsComponent } from '../../../components/shared/inputs/inputs.component';
import { AuthService } from '../../../services/auth.service';
import { ThanaService } from '../../../services/thana.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, CoverComponent, InputsComponent, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  private userService = inject(UserService);
  private adminService = inject(AdminService);
  private dataService = inject(DataService);
  private authService = inject(AuthService);
  private thanaService = inject(ThanaService);

  filterUsers: any;
  users = signal<any>([]);
  admin: any;
  model: any;
  divisions = signal<any>([]);
  districts = signal<any>([]);
  thana = signal<any>([]);
  bloodGroups = signal<any>([]);
  postPersons = signal<any>([]);

  constructor() {
    this.model = {
      division: '',
      district: '',
      thana: '',
      searchQuery: '',
      from: '',
      to: '',
      postBy: '',
      bloodGroup: ''
    };
  }

  ngOnInit(): void {
    this.admin = this.authService.getAdminInfo();
    console.log(this.admin);
    const date = new Date();
    this.getUsers()
    this.model.from = date.toISOString().split('T')[0]
    this.adminService.getAdmin("").subscribe(data => {
      const allAdmin = data;
      this.postPersons.set(allAdmin.map(p => ({ id: p.name, name: p.name })))
      console.log(this.postPersons());
    });
    this.dataService.getJsonData().subscribe(data => {
      this.divisions.set(data?.divisions);
      this.bloodGroups.set(data?.bloodGroups);
    });
  }

  getUsers() {
    this.userService.getUser(this.model.division, this.model.thana, this.model.bloodGroup, '', this.model.postBy, this.model.from, this.model.to).subscribe(data => {
      this.users.set(data);
    });
  }

  onSearch() {
    this.userService.getUser(this.model.searchQuery.trim()).subscribe(data => {
      this.users.set(data);
    });
  }

  onDivisionChanged() {
    this.model.thana = "";
    this.dataService.getCityByParentId(this.model.division).subscribe(
      data => {
        this.districts.set(data);
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
    this.getUsers()
  }

  onDistrictChanged() {
    this.thanaService.getThana({
      "Search": this.model.district
    }).subscribe(data => {
      this.thana.set(data);
    })
  }

  onDelete(id: any): void {
    if (confirm("Are you sure you want to delete?")) {
      this.userService.deleteUser(id).subscribe(data => {
        if (data.id) {
          this.users.set(this.users().filter((d: any) => d.id !== id));
          alert("User deleted successfully!");
        } else {
          console.error('Error deleting User:', data);
        }
      });
    }
  }

  transform(value: any, args: any = 'dd/MM/yyyy'): any {
    if (!value) return null;
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, args);
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
    const userRows = this.users().map((user: any, sl: number) => [
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

}
