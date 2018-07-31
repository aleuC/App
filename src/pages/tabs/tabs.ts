import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { FirstPage } from '../app/firstpage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FirstPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
