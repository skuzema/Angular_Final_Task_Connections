import { Pipe, PipeTransform } from "@angular/core";

import { GroupListData } from "../models/data";

@Pipe({
    name: "sortByDate",
    standalone: true,
})
export class SortByDatePipe implements PipeTransform {
    transform(groups: GroupListData | null): GroupListData | null {
        if (!groups || !groups.Items?.length) {
            return null;
        }

        const sortedItems = [...groups.Items].sort((a, b) => {
            const dateA = a.createdAt;
            const dateB = b.createdAt;
            if (dateB < dateA) {
                return -1;
            }
            if (dateB > dateA) {
                return 1;
            }
            return 0;
        });

        return {
            ...groups,
            Items: sortedItems,
        };
    }
}
