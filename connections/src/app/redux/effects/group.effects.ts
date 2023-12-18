import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, filter, map, mergeMap } from "rxjs/operators";

import { DataService } from "../../core/services/data.service";
import { GroupListItem } from "../../shared/models/data";
import * as groupActions from "../actions/group.actions";
import { selectGroups } from "../selectors/group.selectors";
import * as loginSelectors from "../selectors/login.selectors";

@Injectable()
export class GroupEffects {
    loadGroups$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(groupActions.loadGroups),
            concatLatestFrom(() => {
                console.log(
                    "GroupEffects, selectGroups:",
                    !!this.store.select(selectGroups)
                );
                return this.store.select(selectGroups);
            }),
            filter(([, loaded]) => {
                console.log(
                    "GroupEffects filter loaded: ",
                    Object.keys(loaded).length === 0,
                    loaded
                );
                return Object.keys(loaded).length === 0;
            }),
            exhaustMap(() =>
                this.dataService.getGroups().pipe(
                    map((groups) => {
                        // console.log("getGroups success", groups);
                        return groupActions.loadGroupsSuccess({ groups });
                    }),
                    catchError((error) =>
                        of(groupActions.loadGroupsFailure({ error }))
                    )
                )
            )
        );
    });

    createGroup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(groupActions.createGroup),
            concatLatestFrom(() =>
                this.store.select(loginSelectors.selectLoginResponse)
            ),
            mergeMap(([action, loginResponse]) =>
                this.dataService.createGroup(action.name).pipe(
                    map((data) => {
                        const item: GroupListItem = {
                            id: data.groupID || "",
                            name: action.name,
                            createdAt: Date.now().toString(),
                            createdBy: loginResponse?.uid || "",
                        };
                        console.log("createGroupEffect, success:", data, item);
                        return groupActions.createGroupSuccess({ item });
                    }),
                    catchError((error) =>
                        of(groupActions.createGroupFailure({ error }))
                    )
                )
            )
        );
    });

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
