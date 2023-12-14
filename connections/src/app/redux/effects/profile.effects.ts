/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { DataService } from "../../core/services/data.service";
import * as profileActions from "../actions/profile.actions";

@Injectable()
export class ProfileEffects {
    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(profileActions.logout),
            mergeMap(() =>
                this.dataService.logout().pipe(
                    map(() => {
                        this.router.navigate(["/signin"]);
                        return profileActions.logoutSuccess();
                    }),
                    catchError((error) =>
                        of(profileActions.logoutError({ error }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private router: Router
    ) {}
}
