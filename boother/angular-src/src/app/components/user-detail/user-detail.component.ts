import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BootherService } from '../../services/boother.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: Object;
  urlSegments = this.router.url.split('/');
  id = this.urlSegments[this.urlSegments.length - 1];

  constructor(
    private authService: AuthService,
    private boothersService: BootherService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {

    this.authService.getUser(this.id).subscribe(result => {
      this.user = result.user;
    },
      err => {
        console.log(err);
        return false;
      });

  }

  // Update User
  profileUpdate() {

    this.authService.updateProfile(this.user).subscribe(user => {

      // Validate Email
      if (!this.validateService.validateEmail(user.email)) {
        this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
        return false;
      }

      // Validate Phone
      if (!this.validateService.validatePhone(user.phone)) {
        this.flashMessage.show('Please use a valid phone number', { cssClass: 'alert-danger', timeout: 3000 });
        return false;
      } else {
        this.flashMessage.show('Update successful', { cssClass: 'alert-success', timeout: 3000 });
        // this.router.navigate(['/profile']);
      }

    });

  }

  // Delete User
  userDelete(user) {
    this.authService.deleteUser(this.id).subscribe(result => {

      if (confirm('are you sure!?') === false) {
        return;
      } else {
        this.user = result.user;
        this.flashMessage.show('User removed', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
