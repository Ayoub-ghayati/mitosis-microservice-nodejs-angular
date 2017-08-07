import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, select$ } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { pipe, values, sortBy, prop } from 'ramda';

import { GetCellsAPIActions } from '../cells/api/list/actions';
import { CELL_TYPES, ICell } from '../cells/model';

export const sortCells = (cellDictionary$: Observable<{}>) =>
  cellDictionary$.map(
    pipe(
      values,
      sortBy(prop('name'))));

@Component({
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EucaryotePageComponent {
  // Get eucaryote-related data out of the Redux store as observables.
  @select$(['eucaryote', 'items'], sortCells)
  readonly cells$: Observable<Array<ICell>>;

  @select(['eucaryote', 'loading'])
  readonly loading$: Observable<boolean>;

  @select(['eucaryote', 'error'])
  readonly error$: Observable<any>;

  constructor(getCellsAPIActions: GetCellsAPIActions) {
    getCellsAPIActions.loadCells(CELL_TYPES.EUCARYOTE);
  }
}
