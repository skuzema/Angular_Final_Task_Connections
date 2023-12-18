import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Store } from "@ngrx/store";
import { Observable, catchError, of, skip, switchMap, take } from "rxjs";

import { SnackbarComponent } from "../../../../core/components/snackbar/snackbar.component";
import * as groupActions from "../../../../redux/actions/group.actions";
import * as groupSelectors from "../../../../redux/selectors/group.selectors";
import { GroupListData, SnackType } from "../../../../shared/models/data";
import { SortByDatePipe } from "../../../../shared/pipes/sort-by-date.pipe";
import { NewGroupComponent } from "../new-group/new-group.component";

@Component({
    selector: "app-group-list",
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        SortByDatePipe,
        NewGroupComponent,
    ],
    providers: [SnackbarComponent],
    templateUrl: "./group-list.component.html",
    styleUrl: "./group-list.component.scss",
})
export class GroupListComponent implements OnInit {
    groups$: Observable<GroupListData>;
    loading$: Observable<boolean>;
    error$: Observable<any>;

    updateCountdown: number | null = null;
    isUpdateDisabled = false;
    groupName: string;

    constructor(
        private store: Store,
        public dialog: MatDialog,
        public snackBar: SnackbarComponent
    ) {
        this.groups$ = store.select(groupSelectors.selectGroups);
        this.loading$ = store.select(groupSelectors.selectLoading);
        this.error$ = store.select(groupSelectors.selectError);

        this.groupName = "";
    }

    ngOnInit() {
        this.store.dispatch(groupActions.loadGroups());
        console.log("ngOnInit");

        this.error$.pipe(skip(1), take(1)).subscribe((error) => this.showErrorMessage(error));
    }

    onUpdateClick() {
        this.store.dispatch(groupActions.loadGroups());
    }

    onDeleteClick(event: Event, groupId: string) {
        event.preventDefault();
        console.log("groupId:", groupId);
        // this.store.dispatch(groupActions.deleteGroup({ groupId }));
    }

    openNewGroupDialog(): void {
        const dialogRef = this.dialog.open(NewGroupComponent, {
            data: { groupName: this.groupName },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.groupName = result;
                this.store.dispatch(
                    groupActions.createGroup({ name: this.groupName })
                );

                this.groups$ 
                    .pipe(
                        switchMap(() => this.groups$),
                        switchMap((groups) => {
                            // return of(groups);
                            return this.groups$.pipe(skip(1), take(1));
                        }),
                        catchError((error) => { 
                            this.showErrorMessage(error);
                            return of(error);
                        }))
                        .subscribe((groups) => {
                            if (groups) {
                                this.snackBar.showSnackbar(
                                    "User group created successfully.",
                                    SnackType.success
                                );
                                this.store.dispatch(groupActions.loadGroups());
                            }
                        });
            }
        });
    }

    showErrorMessage(error: any) {
        if (error) {
            console.log("Load Group, error$", error);
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
