import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { interval, of } from "rxjs";
import {
    catchError,
    exhaustMap,
    filter,
    map,
    mergeMap,
    switchMap,
    takeUntil,
    tap,
    withLatestFrom,
} from "rxjs/operators";

import { DataService } from "../../core/services/data.service";
import { GroupListItem } from "../../shared/models/data";
import * as groupActions from "../actions/group.actions";
import {
    selectGroups,
    selectNextGroupUpdateTime,
} from "../selectors/group.selectors";
import * as loginSelectors from "../selectors/login.selectors";

@Injectable()
export class GroupEffects {
    loadGroups$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(groupActions.loadGroups),
            concatLatestFrom(() => this.store.select(selectGroups)),
            filter(([, loaded]) => Object.keys(loaded).length === 0),
            exhaustMap(() =>
                this.dataService.getGroups().pipe(
                    map((groups) => {
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

    updateGroups$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(groupActions.updateGroups),
            exhaustMap(() =>
                this.dataService.getGroups().pipe(
                    map((groups) => {
                        return groupActions.updateGroupsSuccess({ groups });
                    }),
                    catchError((error) =>
                        of(groupActions.updateGroupsFailure({ error }))
                    )
                )
            )
        );
    });

    startCounter$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(groupActions.setStartCounter),
            switchMap(({ value }) => {
                if (value) {
                    return interval(1000).pipe(
                        takeUntil(
                            this.actions$.pipe(
                                ofType(groupActions.setStartCounter)
                            )
                        ),
                        withLatestFrom(
                            this.store.select(selectNextGroupUpdateTime)
                        ),
                        tap(([_, nextGroupUpdateTime]) => {
                            if (
                                nextGroupUpdateTime &&
                                nextGroupUpdateTime > 0
                            ) {
                                this.store.dispatch(
                                    groupActions.decrementNextGroupUpdateTime()
                                );
                            } else {
                                this.store.dispatch(
                                    groupActions.setStartCounter({
                                        value: false,
                                    })
                                );
                            }
                        }),
                        map(() => groupActions.noop())
                    );
                }
                return of(groupActions.noop());
            })
        );
    });

    constructor(
        private store: Store,
        private actions$: Actions,
        private dataService: DataService
    ) {}
}
