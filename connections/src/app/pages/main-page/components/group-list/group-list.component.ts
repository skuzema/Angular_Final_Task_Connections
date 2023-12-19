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
import * as groupActions from "../../../../redux/actions/group.actions";
import * as groupSelectors from "../../../../redux/selectors/group.selectors";
import * as loginSelectors from "../../../../redux/selectors/login.selectors";
import { GroupListData, SnackType } from "../../../../shared/models/data";
import { SortByDatePipe } from "../../../../shared/pipes/sort-by-date.pipe";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
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
        DeleteDialogComponent,
    ],
    providers: [SnackbarComponent],
    templateUrl: "./group-list.component.html",
    styleUrl: "./group-list.component.scss",
})
export class GroupListComponent implements OnInit, OnDestroy {
    groups$: Observable<GroupListData>;
    loading$: Observable<boolean>;
    error$: Observable<any>;
    currentUserUID$: Observable<string | undefined>;
    nextGroupUpdateTime$: Observable<number | null>;

    groupName: string;

    constructor(
        private store: Store,
        public dialog: MatDialog,
        public snackBar: SnackbarComponent
    ) {
        this.groups$ = store.select(groupSelectors.selectGroups);
        this.loading$ = store.select(groupSelectors.selectLoading);
        this.error$ = store.select(groupSelectors.selectError);
        this.currentUserUID$ = store.select(loginSelectors.selectUid);
        this.nextGroupUpdateTime$ = store.select(
            groupSelectors.selectNextGroupUpdateTime
        );
        this.groupName = "";
    }


    ngOnDestroy(): void {
        console.log("Group List, ngOnDestroy");
        this.store.dispatch(groupActions.setStartCounter({ value: false }));
    }

    ngOnInit() {
        console.log("Group List, ngOnInit");
        this.nextGroupUpdateTime$ = this.store.select(
            groupSelectors.selectNextGroupUpdateTime
        );
        this.store.dispatch(groupActions.setStartCounter({value: true}));
        this.store.dispatch(groupActions.loadGroups());
        this.error$
            .pipe(skip(1), take(1))
            .subscribe((error) => this.showErrorMessage(error));
    }

    onUpdateGroup() {
        this.store.dispatch(groupActions.updateGroups());
        this.error$
            .pipe(take(1))
            .subscribe((error) => this.showErrorMessage(error));

        this.groups$.pipe(take(1)).subscribe((groups) => {
            if (groups) {
                this.store.dispatch(groupActions.setNextGroupUpdateTime());
                this.store.dispatch(groupActions.setStartCounter({ value: true }));
            }
        });
    }

    onDeleteClick(event: Event, groupId: string) {
        event.preventDefault();
        console.log("groupId:", groupId);
        const dialogRef = this.dialog.open(DeleteDialogComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.store.dispatch(groupActions.deleteGroup({ groupId }));

                this.error$
                    .pipe(take(1))
                    .subscribe((error) => this.showErrorMessage(error));

                this.groups$.pipe(take(1)).subscribe((group) => {
                    if (group) {
                        this.snackBar.showSnackbar(
                            "Group deleted successfully!",
                            SnackType.success
                        );
                    }
                });
            }
        });
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

                this.error$
                    .pipe(take(1))
                    .subscribe((error) => this.showErrorMessage(error));

                this.groups$.pipe(take(1)).subscribe((group) => {
                    if (group) {
                        this.snackBar.showSnackbar(
                            "Group created successfully!",
                            SnackType.success
                        );
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
