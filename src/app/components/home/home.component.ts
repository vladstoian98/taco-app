import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from 'src/app/service/home-service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../app.component.scss']
})
export class HomeComponent {

  constructor(private homeService: HomeService) {}

  ngOnInit() : void {
    this.homeService.getHomePageMessage().subscribe(
      (response : string) => {
        console.log(response);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

}
