import {Component} from '@angular/core';

@Component({
  selector: 'app-loading-list-options',
  templateUrl: './list-options.component.html'
})
export class ListOptionsComponent {
  align: 'left' | 'center' | 'right' = 'center';
  state = true;
  color: string | undefined;

  alignments: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];
  colors = [undefined, 'blue', 'red', 'green', 'brown', 'yellow', 'white', 'darker'];
}
