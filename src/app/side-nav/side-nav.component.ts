import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { Item } from '../daily-tracking/daily-tracking.model';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    [
      CommonModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      RouterModule,
      MatMenuModule,
    ],
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SideNavComponent {
  mobileQuery: MediaQueryList;

  fillerNav = [
    { name: 'Home', route: '/home' },
    // { name: 'DAILY-ME', route: '/daily-me' },
    // { name: 'DAILY-TRACKING', route: '/daily-tracking' },
    // { name: 'TODO', route: '/todo' },
  ];

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );

  isLoggedIn = false;
  userName = '';
  userPhotoUrl = '';
  items$: Observable<Item[]> | undefined;

  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private auth: Auth
  ) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.displayName || '';
        this.userPhotoUrl = user.photoURL || '';
      } else {
        this.isLoggedIn = false;
        this.userName = '';
        this.userPhotoUrl = '';
      }
    });

    // this.items$ = this.firestoreService.getItems();
  }

  login(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout(): void {
    signOut(this.auth);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  closeSidenav(snav: MatSidenav): void {
    console.log('closeSidenav');
    if (this.mobileQuery.matches) {
      snav.close();
    }
  }
}
