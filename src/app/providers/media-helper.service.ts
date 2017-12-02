import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MediaHelperService {
  private closeSide = new BehaviorSubject<boolean>(false);
  closeSideNav$ = this.closeSide.asObservable();

  constructor() {}

  getNumberOfColumns(mediaSize: string) {
    switch (mediaSize) {
      case 'xs':
        return 1;
      case 'sm':
        return 2;
      case 'md':
        return 3;
      case 'lg':
        return 4;
      case 'xl':
        return 5;
    }
  }

  getRowHeight(mediaSize: string) {
    switch (mediaSize) {
      case 'xs':
        return '2:3';
      case 'sm':
        return '3:5';
      case 'md':
        return '3:5';
      case 'lg':
        return '5:8';
      case 'xl':
        return '4:6';
    }
  }

  getGutterSize(mediaSize: string) {
    switch (mediaSize) {
      case 'xs':
        return '2';
      case 'sm':
        return '4';
      case 'md':
        return '6';
      case 'lg':
        return '10';
      case 'xl':
        return '4:6';
    }
  }

  closeSideNav(status: boolean) {
    this.closeSide.next(status);
  }
}
