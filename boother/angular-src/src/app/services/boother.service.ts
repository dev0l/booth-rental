import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BootherService {
  booth: any;

  constructor(private http: Http) { }

  // Booths

  registerBooth(booth) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/booths/booth-reg', booth, { headers: headers })
      .map(res => res.json());
  }

  getBooth(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/booths/booth-detail/' + id, { headers: headers })
      .map(res => res.json());
  }

  getAllBooths() {
    return this.http.get('http://localhost:3000/booths/booth-list')
      .map(res => res.json());
  }

  updateBoothz(booth) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/booths/boothz', booth, { headers: headers })
      .map(res => res.json());
  }

  deleteBooth(id) {
    let headers = new Headers();
    return this.http.delete('http://localhost:3000/booths/booth-detail/' + id, { headers: headers })
      .map(res => res.json());
  }

  // Booth Cards

  regBoothCard(boothcard) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/boothcards/boother', boothcard, { headers: headers })
      .map(res => res.json());
  }

  getBoothCard() {
    let headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/boothcards/boothcard', { headers: headers })
      .map(res => res.json());
  }

}
