import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  reactiveForm: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];
  forbiddenProyectNames = ['Test'];
  onSubmit () {
    console.log(this.reactiveForm.value);
    this.reactiveForm.reset({
      'status': 'Stable'
    });
  }
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenProyectNames.indexOf(control.value) !== -1) {
      return {'nameIsForbbiden': true};
    }
    return null;
  }

  forbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'nameIsForbbiden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required], this.forbiddenNamesAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
      });
  }
}
