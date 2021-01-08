import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BoardCoreService } from '@core/services/board-core.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Base } from 'src/app/share/models/base';

@UntilDestroy()
@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleListComponent implements OnInit, OnChanges {
  @Input() boardId: number;
  @Input() selectedIds: number[];
  refreshSubj$ = new Subject<number>();
  assignesSubj$ = new BehaviorSubject<Base[]>([]);

  constructor(private boardCoreService: BoardCoreService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.boardId && changes.boardId) {
      this.refreshSubj$.next(this.boardId);
    }

    if (changes.selectedIds) {
      this.getSelectedAssignes(this.selectedIds);
    }
  }

  ngOnInit(): void {
    this.initRefreshSubj();
    this.refreshSubj$.next(this.boardId);
  }

  private initRefreshSubj() {
    this.refreshSubj$
      .pipe(
        untilDestroyed(this),
        switchMap((boardId: number) => this.boardCoreService.getUsersByBoardId(boardId))
      )
      .subscribe(this.assignesSubj$);
  }

  private getSelectedAssignes(ids: number[]) {
    const filterAssignes = this.assignesSubj$.value
      .map((user) => ({
        ...user,
        isSelected: ids?.includes(user.id),
      }))
      ?.sortBy((user) => !user.isSelected);

    this.assignesSubj$.next(filterAssignes);
  }
}
