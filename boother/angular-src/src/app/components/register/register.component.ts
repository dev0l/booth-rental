import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
  comments: String;
  password: String;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      comments: this.comments
      // username: this.username,
      // password: this.password
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Vänligen fyll i alla fält', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Vänligen använd en giltig e-postadress', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate Phone
    if (!this.validateService.validatePhone(user.phone)) {
      this.flashMessage.show('Vänligen använd ett giltigt telefonnummer', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Kund registrerad.', { cssClass: 'alert-success', timeout: 3000 });
        // this.router.navigate(['/login']);
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('Något gick fel. Vänligen kontrollera uppgifter.',
          { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });

  }

};
