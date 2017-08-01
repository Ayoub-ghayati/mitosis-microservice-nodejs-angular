import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { CellType, ICell, fromServer } from '../model';

// We use the gql tag to parse our query string into a query document
const GetCellByTypes = gql`
  query GetCellByTypes($type:CellType!) {
    cellsByType(type:$type) {
      id
      name
      type
      color
      size
    }
  }
`;

const GetNewCell = gql`
        subscription GetnewCell($type:CellType!) {
            newCell (type:$type) {
              id
              name
              type
              color
              size
            }
        }`;

@Injectable()
export class CellAPIService {
  constructor(private apollo: Apollo) {
  }

  getAll(type: CellType): ApolloQueryObservable<Array<ICell>> {
    return this.apollo.watchQuery({
      query: GetCellByTypes,
      variables: {
        type: type
      }
    });
  }

  getNewCell(type: CellType): Observable<ICell> {
    return this.apollo.subscribe({
      query: GetNewCell,
      variables: {
        type: type
      }
    });
  }
}
