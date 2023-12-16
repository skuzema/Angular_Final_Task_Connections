/* eslint-disable arrow-body-style */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { DataService } from "../../core/services/data.service";
import * as groupActions from "../actions/group.actions";

@Injectable()
export class GroupEffects {
    loadGroups$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(groupActions.loadGroups),
            mergeMap(() =>
                this.dataService.getGroups().pipe(
                    map((groups) => groupActions.loadGroupsSuccess({ groups })),
                    catchError((error) =>
                        of(groupActions.loadGroupsFailure({ error }))
                    )
                )
            )
        );
    });

    // createGroup$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(groupActions.createGroup),
    //         mergeMap(({ name }) =>
    //             this.dataService.createGroup(name).pipe(
    //                 map((group) => groupActions.createGroupSuccess({ group })),
    //                 catchError((error) =>
    //                     of(groupActions.createGroupFailure({ error }))
    //                 )
    //             )
    //         )
    //     );
    // });

    deleteGroup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(groupActions.deleteGroup),
            mergeMap(({ groupId }) =>
                this.dataService.deleteGroup(groupId).pipe(
                    map(() => groupActions.deleteGroupSuccess({ groupId })),
                    catchError((error) =>
                        of(groupActions.deleteGroupFailure({ error }))
                    )
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
