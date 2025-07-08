import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    RouterOutlet

  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class MainLayoutComponent {

}
