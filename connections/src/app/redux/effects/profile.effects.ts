/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, filter, map, take } from "rxjs/operators";

import { DataService } from "../../core/services/data.service";
import * as profileActions from "../actions/profile.actions";
import { selectUserProfile } from "../selectors/profile.selectors";

@Injectable()
export class ProfileEffects {
    loadUserProfile$ = createEffect(() => {
        console.log("ProfileEffects");
        return this.actions$.pipe(
            ofType(profileActions.loadUserProfile),
            concatLatestFrom(() => this.store.select(selectUserProfile)),
            filter(([, loaded]) => !loaded),
            exhaustMap(() =>
                this.dataService.getUserProfile().pipe(
                    map((profile) => {
                        console.log("Profile loaded successfully:", profile);
                        return profileActions.loadUserProfileSuccess({
                            profile,
                        });
                    }),
                    catchError((error) => {
                        console.error("Error loading user profile:", error);
                        return of(
                            profileActions.loadUserProfileFailure({ error })
                        );
                    })
                )
            ),
            take(1)
        );
    });

    constructor(
        private store: Store,
        private actions$: Actions,
        private dataService: DataService
    ) {}
}
