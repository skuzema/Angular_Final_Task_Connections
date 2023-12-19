import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Store } from "@ngrx/store";
import {
    Observable,
    skip,
    take,
} from "rxjs";

import { SnackbarComponent } from "../../../../core/components/snackbar/snackbar.component";
import * as peopleActions from "../../../../redux/actions/people.actions";
import * as peopleSelectors from "../../../../redux/selectors/people.selectors";
import * as loginSelectors from "../../../../redux/selectors/login.selectors";
import { PeopleListData, SnackType } from "../../../../shared/models/data";
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
    ],
    providers: [SnackbarComponent],
    templateUrl: "./people-list.component.html",
    styleUrl: "./people-list.component.scss",
})
export class PeopleListComponent implements OnInit, OnDestroy {
    peoples$: Observable<PeopleListData>;
    loading$: Observable<boolean>;
    error$: Observable<any>;
    currentUserUID$: Observable<string | undefined>;
    nextPeopleUpdateTime$: Observable<number | null>;

    constructor(
        private store: Store,
        public dialog: MatDialog,
        public snackBar: SnackbarComponent
    ) {
        this.peoples$ = store.select(peopleSelectors.selectPeoples);
        this.loading$ = store.select(peopleSelectors.selectLoading);
        this.error$ = store.select(peopleSelectors.selectError);
        this.currentUserUID$ = store.select(loginSelectors.selectUid);
        this.nextPeopleUpdateTime$ = store.select(
            peopleSelectors.selectNextPeopleUpdateTime
        );
    }


    ngOnDestroy(): void {
        console.log("People List, ngOnDestroy");
        this.store.dispatch(peopleActions.setStartCounter({ value: false }));
    }

    ngOnInit() {
        console.log("People List, ngOnInit");
        this.nextPeopleUpdateTime$ = this.store.select(
            peopleSelectors.selectNextPeopleUpdateTime
        );
        this.store.dispatch(peopleActions.setStartCounter({value: true}));
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
                this.store.dispatch(peopleActions.setStartCounter({ value: true }));
            }
        });
    }

    openNewPeopleDialog(): void {
        // const dialogRef = this.dialog.open(NewPeopleComponent, {
        //     data: { peopleName: this.peopleName },
        // });

        // dialogRef.afterClosed().subscribe((result) => {
        //     if (result) {
        //         this.peopleName = result;
        //         this.store.dispatch(
        //             peopleActions.createPeople({ name: this.peopleName })
        //         );

        //         this.error$
        //             .pipe(take(1))
        //             .subscribe((error) => this.showErrorMessage(error));

        //         this.peoples$.pipe(take(1)).subscribe((people) => {
        //             if (people) {
        //                 this.snackBar.showSnackbar(
        //                     "People created successfully!",
        //                     SnackType.success
        //                 );
        //             }
        //         });
        //     }
        // });
    }

    showErrorMessage(error: any) {
        if (error) {
            console.log("Load People, error$", error);
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
