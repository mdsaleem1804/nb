import { Component, OnInit } from '@angular/core';
import { slideToRight } from './../../router.animations';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [slideToRight()]
})
export class LayoutComponent implements OnInit {

  constructor(private _router: Router, private _activatedRouter: ActivatedRoute) { 
    this._activatedRouter.params
      .subscribe(params => {
        if (!localStorage.getItem("_user")) {
          this._router.navigate(['login']);
        } else if(this._router.url == "/"){
          this._router.navigate(['sales-report']);
        }
      });
  }

  ngOnInit() {
  }

}
