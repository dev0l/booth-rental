import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
import { BootherService } from '../../services/boother.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booth-detail',
  templateUrl: './booth-detail.component.html',
  styleUrls: ['./booth-detail.component.css']
})
export class BoothDetailComponent implements OnInit {
  urlSegments = this.router.url.split('/');
  id = this.urlSegments[this.urlSegments.length - 1];
  checkedStatus = false;

  booth: Object;
  // period: Array<any>;

  constructor(
    // private authService: AuthService,
    private bootherService: BootherService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {

    this.bootherService.getBooth(this.id).subscribe(result => {
      this.booth = result.booth;
    },
      err => {
        console.log(err);
        return false;
      });

  }

  changeCheckedStatus(booth) {
    if(booth.rentedFrom = true) {
      this.checkedStatus = true;
    }
  }

  // Update Booth
  boothUpdate() {

    this.bootherService.updateBoothz(this.booth).subscribe(booth => {

      // Validate Booth
      if (!this.validateService.validateBoothUpdate(booth)) {
        this.flashMessage.show('Vänligenn ange korrekta uppgifter', { cssClass: 'alert-danger', timeout: 3000 });
        return false;
      // }
      // Validate Date
      // if (!this.validateService.validateDate(booth.rentedFrom)) {
      //   this.flashMessage.show('Vänligen ange korrekt datum', { cssClass: 'alert-danger', timeout: 3000 });
      //   return false;
    } else {
        this.flashMessage.show('Ändringar sparade', { cssClass: 'alert-success', timeout: 3000 });
        // this.router.navigate(['/booth-detail']);
      }

    });

  }

  clearBooth(booth) {
    booth = this.booth;
    booth.rented = false;
    booth.rentedFrom = '';
    booth.rentedTo = '';
    booth.paid = false;
    // booth.renter = '';
  }

  // Delete Booth
  boothDelete(booth) {
    this.bootherService.deleteBooth(this.id).subscribe(result => {

      if (confirm('are you sure!?') === false) {
        return;
      } else {
        this.booth = result.booth;
        this.flashMessage.show('Booth removed', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
