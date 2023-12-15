/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, mergeMap, switchMap } from "rxjs/operators";

import { DataService } from "../../core/services/data.service";
import * as profileActions from "../actions/profile.actions";

@Injectable()
export class ProfileEffects {
    loadUserProfile$ = createEffect(() => {
      console.log("ProfileEffects");
      return this.actions$.pipe(
        ofType(profileActions.loadUserProfile),
        exhaustMap(() =>
          this.dataService.getUserProfile().pipe(
            map((profile) => {
              console.log("Profile loaded successfully:", profile);
              return profileActions.loadUserProfileSuccess({ profile })
            }),
            catchError((error) => {
              console.error("Error loading user profile:", error);
              return of(profileActions.loadUserProfileFailure({ error }))
            })
          )
        )
      )
    });
  
    constructor(
      private actions$: Actions,
      private dataService: DataService
    ) {}
}

