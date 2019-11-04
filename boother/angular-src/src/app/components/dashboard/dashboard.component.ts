import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BootherService } from '../../services/boother.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  d = new Date();
  date = this.d.toDateString();
  created = this.date;
  urlSegments = this.router.url.split('/');
  id = this.urlSegments[this.urlSegments.length - 1];

  users: Array<any>;
  user: Object;
  booths: Array<any>;
  booth: Object;
  bNr: Number;
  rented: Boolean;
  paid: Boolean;
  // renter: Object;
  comments: String;

  constructor(
    private authService: AuthService,
    private bootherService: BootherService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {

    // All Users
    this.authService.getAllUsers().subscribe(response => {
      this.users = response;
    });

    // All Booths
    this.bootherService.getAllBooths().subscribe(response => {
      this.booths = response;
    });

  }

  // Add Booth
  onRegBoothSubmit() {
    const booth = {
      id: this.id,
      bNr: this.bNr,
      rented: this.rented,
      paid: this.paid,
      // renter: null,
      comments: this.comments,
      created: this.created
    };

    // Required Fields
    if (!this.validateService.validateBooth(booth)) {
      this.flashMessage.show('Vänligen fyll i alla fält', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register Booth
    this.bootherService.registerBooth(booth).subscribe(data => {
      if (data.success) {
        // this.booths.push({
        //   bNr: booth.bNr,
        //   rented: booth.rented,
        //   paid: booth.paid,
        //   created: booth.created
        // });
        this.flashMessage.show('Bås registrerat', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('Något gick fel. Vänligen kontrollera uppgifter.',
          { cssClass: 'alert-danger', timeout: 3000 });
      }
    });

  }

  // Delete Booth
  // boothDelete(booth) {
  //   this.bootherService.deleteBooth(this.id).subscribe(result => {

  //     if (confirm('are you sure!?') === false) {
  //       return;
  //     } else {
  //       this.booth = result.booth;
  //       this.flashMessage.show('User removed', { cssClass: 'alert-success', timeout: 3000 });
  //       this.router.navigate(['/dashboard']);
  //     }
  //   });
  // }

  // Delete User
  // userDelete(user) {
  //   this.authService.deleteUser(this.id).subscribe(result => {

  //     if (confirm('are you sure!?') === false) {
  //       return;
  //     } else {
  //       this.user = result.user;
  //       this.flashMessage.show('User removed', { cssClass: 'alert-success', timeout: 3000 });
  //       this.router.navigate(['/dashboard']);
  //     }
  //   });
  // }

}
