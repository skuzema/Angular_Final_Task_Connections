/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Store } from "@ngrx/store";
import { Observable, skip, take } from "rxjs";

import { SnackbarComponent } from "../../../../core/components/snackbar/snackbar.component";
import * as peopleActions from "../../../../redux/actions/people.actions";
import * as loginSelectors from "../../../../redux/selectors/login.selectors";
import * as peopleSelectors from "../../../../redux/selectors/people.selectors";
import { HighlightConversationIdDirective } from "../../../../shared/directives/highlight-conversation-id.directive";
import {
    ConversationListData,
    PeopleWithConversation,
    SnackType,
} from "../../../../shared/models/data";
import { SortByDatePipe } from "../../../../shared/pipes/sort-by-date.pipe";

@Component({
    selector: "app-people-list",
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        SortByDatePipe,
        HighlightConversationIdDirective,
    ],
    providers: [SnackbarComponent],
    templateUrl: "./people-list.component.html",
    styleUrl: "./people-list.component.scss",
})
export class PeopleListComponent implements OnInit, OnDestroy {
    peoples$: Observable<PeopleWithConversation[]>;
    conversations$: Observable<ConversationListData>;
    loading$: Observable<boolean>;
    error$: Observable<any>;
    currentUserUID$: Observable<string | undefined>;
    nextPeopleUpdateTime$: Observable<number | null>;

    constructor(
        private store: Store,
        public dialog: MatDialog,
        public snackBar: SnackbarComponent
    ) {
        this.peoples$ = store.select(
            peopleSelectors.selectPeopleWithConversation
        );
        this.conversations$ = store.select(peopleSelectors.selectConversations);
        this.loading$ = store.select(peopleSelectors.selectLoading);
        this.error$ = store.select(peopleSelectors.selectError);
        this.currentUserUID$ = store.select(loginSelectors.selectUid);
        this.nextPeopleUpdateTime$ = store.select(
            peopleSelectors.selectNextPeopleUpdateTime
        );
    }

    ngOnDestroy(): void {
        this.store.dispatch(peopleActions.setStartCounter({ value: false }));
    }

    ngOnInit() {
        this.nextPeopleUpdateTime$ = this.store.select(
            peopleSelectors.selectNextPeopleUpdateTime
        );
        this.store.dispatch(peopleActions.setStartCounter({ value: true }));
        this.store.dispatch(peopleActions.loadPeoples());
        this.store.dispatch(peopleActions.loadConversations());
        this.error$
            .pipe(skip(1), take(1))
            .subscribe((error) => this.showErrorMessage(error));
    }

    onUpdatePeople() {
        this.store.dispatch(peopleActions.updatePeoples());
        this.store.dispatch(peopleActions.updateConversations());
        this.error$
            .pipe(take(1))
            .subscribe((error) => this.showErrorMessage(error));

        this.peoples$.pipe(take(1)).subscribe((peoples) => {
            if (peoples) {
                this.store.dispatch(peopleActions.setNextPeopleUpdateTime());
                this.store.dispatch(
                    peopleActions.setStartCounter({ value: true })
                );
            }
        });
    }

    onPeopleClick(
        event: Event,
        conversationId: string | undefined,
        uid: string | undefined
    ): void {
        if (!conversationId) {
            const companion = { companion: uid };
            this.store.dispatch(
                peopleActions.createConversation({ companion })
            );

            this.error$
                .pipe(take(1))
                .subscribe((error) => this.showErrorMessage(error));

            this.conversations$.pipe(take(1)).subscribe((conversations) => {
                if (conversations) {
                    this.snackBar.showSnackbar(
                        "Conversation created successfully!",
                        SnackType.success
                    );
                }
            });
        }
    }

    showErrorMessage(error: any) {
        if (error) {
            if (
                error.status === 400 &&
                error.error.type === "NotFoundException"
            ) {
                this.snackBar.showSnackbar(
                    error.error.message,
                    SnackType.error
                );
            } else {
                const msg = error.error.message
                    ? error.error.message
                    : "Network error";
                this.snackBar.showSnackbar(msg, SnackType.error);
            }
        }
    }
}
