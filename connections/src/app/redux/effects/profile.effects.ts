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
    loadUserProfile$ = createEffect(() =>
      this.actions$.pipe(
        ofType(profileActions.loadUserProfile),
        exhaustMap(() =>
          this.dataService.getUserProfile().pipe(
            map((profile) =>
              profileActions.loadUserProfileSuccess({ profile })
            ),
            catchError((error) =>
              of(profileActions.loadUserProfileFailure({ error }))
            )
          )
        )
      )
    );
  
    constructor(
      private actions$: Actions,
      private dataService: DataService
    ) {}
}

// export class ProfileEffects {
//     loadUserProfile$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(profileActions.loadUserProfile),
//             mergeMap(() =>
//                 this.dataService.getUserProfile().pipe(
//                     map((profile) =>
//                         profileActions.setUserProfile({ profile })
//                     ),
//                     catchError((error) =>
//                         of(profileActions.setUserProfileError({ error }))
//                     )
//                 )
//             )
//         )
//     );

//     constructor(private actions$: Actions, private dataService: DataService) {}
// }
