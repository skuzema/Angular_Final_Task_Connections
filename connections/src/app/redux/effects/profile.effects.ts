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
            concatLatestFrom(() => {
                return this.store.select(selectUserProfile);
            }),
            filter(([, loaded]) => {
                return !loaded;
            }),
            exhaustMap(() =>
                this.dataService.getUserProfile().pipe(
                    map((profile) => {
                        return profileActions.loadUserProfileSuccess({
                            profile,
                        });
                    }),
                    catchError((error) => {
                        return of(
                            profileActions.loadUserProfileFailure({ error })
                        );
                    })
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

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(profileActions.logout),
            switchMap(() =>
                this.dataService.logout().pipe(
                    map(() => {
                        return profileActions.logoutSuccess();
                    }),
                    catchError((error) => {
                        return of(profileActions.logoutFailure({ error }));
                    })
                )
            )
        );
    });

    constructor(
        private store: Store,
        private actions$: Actions,
        private dataService: DataService
    ) {}
}
