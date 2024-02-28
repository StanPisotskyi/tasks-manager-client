import { Component } from '@angular/core';
import {AccountComponent} from "../account/account.component";
import {Router, ActivatedRoute} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AccountComponent,
    NgClass
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  activeTab: string;
  navLinkClass: string = 'nav-link';
  activeNavLinkClass: string = 'nav-link active';
  tabPanelClass: string = 'tab-pane fade';
  activeTabPanelClass: string = 'tab-pane fade show active';

  constructor(private router: Router, private route: ActivatedRoute) {
    const tabParam: string|null = this.route.snapshot.queryParamMap.get('tab');
    this.activeTab = tabParam === null ? 'tasks' : tabParam;
  }

  selectTab(tab: string) {
    this.activeTab = tab;

    const queryParams = { tab };

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      }
    );
  }
}
