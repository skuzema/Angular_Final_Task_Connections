import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { interval, of } from "rxjs";
import { catchError, exhaustMap, filter, map, mergeMap, switchMap, takeUntil, tap, withLatestFrom } from "rxjs/operators";

import { DataService } from "../../core/services/data.service";
import { PeopleListItem } from "../../shared/models/data";
import * as peopleActions from "../actions/people.actions";
import { selectPeoples, selectNextPeopleUpdateTime, selectStartCounterValue } from "../selectors/people.selectors";
import * as loginSelectors from "../selectors/login.selectors";

@Injectable()
export class PeopleEffects {
    loadPeoples$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(peopleActions.loadPeoples),
            concatLatestFrom(() => this.store.select(selectPeoples)),
            filter(([, loaded]) => Object.keys(loaded).length === 0),
            exhaustMap(() =>
                this.dataService.getPeoples().pipe(
                    map((peoples) => {
                        return peopleActions.loadPeoplesSuccess({ peoples });
                    }),
                    catchError((error) =>
                        of(peopleActions.loadPeoplesFailure({ error }))
                    )
                )
            )
        );
    });

    updatePeoples$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(peopleActions.updatePeoples),
            exhaustMap(() =>
                this.dataService.getPeoples().pipe(
                    map((peoples) => {
                        return peopleActions.updatePeoplesSuccess({ peoples });
                    }),
                    catchError((error) =>
                        of(peopleActions.updatePeoplesFailure({ error }))
                    )
                )
            )
        );
    });

    loadConversations$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(peopleActions.loadConversations),
            concatLatestFrom(() => this.store.select(selectPeoples)),
            filter(([, loaded]) => Object.keys(loaded).length === 0),
            exhaustMap(() =>
                this.dataService.getConversations().pipe(
                    map((conversations) => {
                        return peopleActions.loadConversationsSuccess({ conversations });
                    }),
                    catchError((error) =>
                        of(peopleActions.loadConversationsFailure({ error }))
                    )
                )
            )
        );
    });

    updateConversations$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(peopleActions.updateConversations),
            exhaustMap(() =>
                this.dataService.getConversations().pipe(
                    map((conversations) => {
                        return peopleActions.updateConversationsSuccess({ conversations });
                    }),
                    catchError((error) =>
                        of(peopleActions.updateConversationsFailure({ error }))
                    )
                )
            )
        );
    });

    // createPeople$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(PeopleActions.createPeople),
    //         concatLatestFrom(() =>
    //             this.store.select(loginSelectors.selectLoginResponse)
    //         ),
    //         mergeMap(([action, loginResponse]) =>
    //             this.dataService.createPeople(action.name).pipe(
    //                 map((data) => {
    //                     const item: PeopleListItem = {
    //                         id: data.PeopleID || "",
    //                         name: action.name,
    //                         createdAt: Date.now().toString(),
    //                         createdBy: loginResponse?.uid || "",
    //                     };
    //                     console.log("createPeopleEffect, success:", data, item);
    //                     return PeopleActions.createPeopleSuccess({ item });
    //                 }),
    //                 catchError((error) =>
    //                     of(PeopleActions.createPeopleFailure({ error }))
    //                 )
    //             )
    //         )
    //     );
    // });

    startCounter$ = createEffect(() => this.actions$.pipe(
        ofType(peopleActions.setStartCounter),
        switchMap(({ value }) => {
            if (value) {
                return interval(1000).pipe(
                    takeUntil(this.actions$.pipe(ofType(peopleActions.setStartCounter))),
                    withLatestFrom(this.store.select(selectNextPeopleUpdateTime)),
                    tap(([_, nextPeopleUpdateTime]) => {
                        if (nextPeopleUpdateTime && nextPeopleUpdateTime > 0) {
                            this.store.dispatch(peopleActions.decrementNextPeopleUpdateTime());
                        } else {
                            this.store.dispatch(peopleActions.setStartCounter({ value: false }));
                        }
                    }),
                    map(() => peopleActions.noop())
                );
            } else {
                return of(peopleActions.noop());
            }
        })
    ));

    constructor(
        private store: Store,
        private actions$: Actions,
        private dataService: DataService
    ) {}
}
