import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  genders = ['male', 'female'];
  signupForm: FormGroup;
  //forbiddenUserNames = ['Cri', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.usernameLength.bind(this)]),
        'email': new FormControl(null, [Validators.email, Validators.required]),
      }),
      'hobbies': new FormArray([]),
      'gender': new FormControl('male')
    });

    this.signupForm.statusChanges.subscribe(
      (status)=>console.log(status)
    );
    
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.setValue({'userData': {
      'username': 'Jan',
      'email': 'jan@test.com' 
    },
      'gender': 'female',
      'hobbies': []
  });
  }

  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onAddHobbies(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  usernameLength(control: FormControl): {[s: string]: boolean} {
    
    if(control!== null && control.value!== null && control.value.length !== null && control.value.length >4) {
      console.log("Length "+control.value.length);
      return {'lengthIsForbidden': true};
    }
  }

  
}
