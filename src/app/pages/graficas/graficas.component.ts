import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styles: [
  ]
})
export class GraficasComponent {

 public labels1: string[] = ['Pan', 'Refresco', 'Tacos'];

 public data1 = [
  [10, 15, 40]
];

}
