import { Component } from '@angular/core';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  ngOnInit() {
    console.log('Profile component ngOnInit');
  }
}
