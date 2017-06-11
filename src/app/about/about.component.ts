import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'about',
  styles: [`
  `],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  form: FormGroup;
  public localState: any;
  constructor( @Inject(FormBuilder) fb: FormBuilder,
    public route: ActivatedRoute
  ) {
    this.form = fb.group({ name: fb.group({ first: ['Nancy', Validators.minLength(2)], last: 'Drew' }), email: '' });
  }

  public ngOnInit() {

    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.log('hello `About` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    this.asyncDataWithWebpack();
  }
  private asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    setTimeout(() => {

      System.import('../../assets/mock-data/mock-data.json')
        .then((json) => {
          console.log('async mockData', json);
          this.localState = json;
        });

    });
  }

}
