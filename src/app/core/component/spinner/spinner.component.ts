import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../service/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ProgressSpinnerModule,CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {

  constructor(public spinner: SpinnerService){
    
  }

  ngOnInit(): void {
    
  }
}
