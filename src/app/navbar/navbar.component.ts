import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showProfileMenu = false;
  
  user = {
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'john.doe@example.com'
  };

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  closeProfileMenu() {
    this.showProfileMenu = false;
  }
}