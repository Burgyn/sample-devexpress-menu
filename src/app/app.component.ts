import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DxDrawerModule, DxAccordionModule, DxToolbarModule, DxListModule, DxButtonModule, DxTemplateModule } from "devextreme-angular";
import { FirstLetterPipe } from './firstLetter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DxDrawerModule, DxToolbarModule, DxAccordionModule, HttpClientModule, DxListModule, DxButtonModule, DxTemplateModule, FirstLetterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sample-devexpress-menu';
  menuItems: any[] = [];
  isDrawerOpen: boolean = true;

  constructor(private http: HttpClient) { }

  buttonOptions: any = {
    icon: "menu",
    onClick: () => {
      this.isDrawerOpen = !this.isDrawerOpen;
    }
  }

  ngOnInit() {
    this.http.get<any[]>('assets/menu-data.json').subscribe(data => {
      this.menuItems = data;
    });
  }

  onTitleClick(e: any) {
    if (!e.itemData.items || e.itemData.items.length === 0) {
      e.event.preventDefault();
      e.event.stopPropagation();
    }
  }
}
