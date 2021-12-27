import { Component, OnInit } from '@angular/core';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';


@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {
  isWeb$ = this._breakpoint.isWeb$;
  constructor(
    private _breakpoint: BreakpointService,

  ) { }

  ngOnInit(): void {
  }

}
