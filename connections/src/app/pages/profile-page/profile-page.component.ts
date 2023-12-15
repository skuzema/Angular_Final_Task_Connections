import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";

import * as profileActions from "../../redux/actions/profile.actions";
import { selectProfileError, selectUserProfile } from "../../redux/selectors/profile.selectors";
import { UserProfileData } from "../../shared/models/data";

@Component({
    selector: "app-profile-page",
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, MatCardModule],
    templateUrl: "./profile-page.component.html",
    styleUrl: "./profile-page.component.scss",
})
export class ProfilePageComponent implements OnInit {
    userProfile$: Observable<UserProfileData | null>;
    profileError$: Observable<string | null>;

    constructor(private store: Store) {
        this.userProfile$ = this.store.select(selectUserProfile);
        this.profileError$ = this.store.select(selectProfileError);
    }

    ngOnInit(): void {
        console.log("profile ngOnInit");
        this.store.dispatch(profileActions.loadUserProfile());
    }
}
