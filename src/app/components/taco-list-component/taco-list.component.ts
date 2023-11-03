import { Component, OnInit } from '@angular/core';
import { Taco } from '../../tables/taco';
import { TacoService } from '../../service/taco-service/taco.service';

@Component({
  selector: 'app-taco-list',
  templateUrl: './taco-list.component.html',
  styleUrls: ['./taco-list.component.scss', '../../app.component.scss']
})
export class TacoListComponent implements OnInit {
  tacos: Taco[] = [];

  constructor(private tacoService: TacoService) { }

  ngOnInit(): void {
    this.tacoService.getRecentTacos().subscribe(tacos => this.tacos = tacos);
  }
}
