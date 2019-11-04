import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BootherService } from '../../services/boother.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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

    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
      err => {
        console.log(err);
        return false;
      });

  }

  // Update Profile
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

}
