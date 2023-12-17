/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { DataService } from "../../core/services/data.service";
import * as loginActions from "../actions/login.actions";

@Injectable()
export class LoginEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginActions.login),
            switchMap(({ loginData }) =>
                this.dataService.login(loginData).pipe(
                    map((loginResponse) =>
                        loginActions.loginSuccess({ loginResponse })
                    ),
                    catchError((error) =>
                        of(loginActions.loginFailure({ error }))
                    )
                )
            )
        )
    );

    constructor(private actions$: Actions, private dataService: DataService) {}
}
