/* eslint-disable arrow-body-style */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import {
    catchError,
    exhaustMap,
    filter,
    map,
    switchMap,
    take,
} from "rxjs/operators";

import { DataService } from "../../core/services/data.service";
import * as profileActions from "../actions/profile.actions";
import { selectUserProfile } from "../selectors/profile.selectors";

@Injectable()
export class ProfileEffects {
    loadUserProfile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(profileActions.loadUserProfile),
            concatLatestFrom(() => this.store.select(selectUserProfile)),
            filter(([, loaded]) => !loaded),
            exhaustMap(() =>
                this.dataService.getUserProfile().pipe(
                    map((profile) =>
                        profileActions.loadUserProfileSuccess({
                            profile,
                        })
                    ),
                    catchError((error) =>
                        of(profileActions.loadUserProfileFailure({ error }))
                    )
                )
            ),
            take(1)
        );
    });

    updateUserProfile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(profileActions.updateProfile),
            switchMap((action) => {
                if (action.name !== undefined && action.name !== null) {
                    return this.dataService.updateUserProfile(action.name).pipe(
                        map(() =>
                            profileActions.updateProfileSuccess({
                                name: action.name,
                            })
                        ),
                        catchError((error) =>
                            of(profileActions.updateProfileError({ error }))
                        )
                    );
                }
                return of();
            })
        );
    });

    constructor(
        private store: Store,
        private actions$: Actions,
        private dataService: DataService
    ) {}
}
