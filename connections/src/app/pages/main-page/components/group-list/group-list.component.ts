import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";

import * as groupActions from "../../../../redux/actions/group.actions";
import * as groupSelectors from "../../../../redux/selectors/group.selectors";
import { GroupListData } from "../../../../shared/models/data";

@Component({
    selector: "app-group-list",
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
    ],
    templateUrl: "./group-list.component.html",
    styleUrl: "./group-list.component.scss",
})
export class GroupListComponent implements OnInit, OnDestroy {
    groups$: Observable<GroupListData>;
    loading$: Observable<boolean>;
    error$: Observable<any>;

    updateCountdown: number | null = null;
    isUpdateDisabled = false;

    private destroy$: Subject<void> = new Subject<void>();

    constructor(private store: Store) {
        this.groups$ = store.select(groupSelectors.selectGroups);
        this.loading$ = store.select(groupSelectors.selectLoading);
        this.error$ = store.select(groupSelectors.selectError);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit() {
        this.store.dispatch(groupActions.loadGroups());
    }

    onUpdateClick() {
        this.store.dispatch(groupActions.loadGroups());
    }

    onCreateClick(name: string) {
        this.store.dispatch(groupActions.createGroup({ name }));
    }

    onDeleteClick(event: Event, groupId: string) {
        event.preventDefault();
        console.log("groupId:", groupId);
        // this.store.dispatch(groupActions.deleteGroup({ groupId }));
    }
}
