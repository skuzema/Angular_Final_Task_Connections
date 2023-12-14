import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { loadUserProfile } from "../../redux/actions/profile.actions";
import { selectUserProfile } from "../../redux/selectors/profile.selectors";
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

    constructor(private store: Store) {
        this.userProfile$ = this.store.select(selectUserProfile);
        console.log("constructor, userProfile:", this.userProfile$);
    }

    ngOnInit(): void {
        console.log("ngOnInit, userProfile:", this.userProfile$);
        this.store.dispatch(loadUserProfile());
        // this.userProfile$ = this.store
        //     .select(selectUserProfile)
        //     .pipe(tap(() => this.store.dispatch(loadUserProfile())));
    }
}
