import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo } from '../../models/veiculo.model';
import { InfoVeiculo } from '../../models/InfoVeiculo.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle: Veiculo | null = null;
  vehicleData: InfoVeiculo[] = [];
  selectedVehicleName: string = 'Ranger';

  vinMapping: { [key: string]: string[] } = {
    'Ranger': ['2FRHDUYS2Y63NHD22454', '2FRHDUYS2Y63NHD22455', '2FRHDUYS2Y63NHD22654'],
    'Mustang': ['2RFAASDY54E4HDU34874', '2FRHDUYS2Y63NHD22854'],
    'Territory': ['2RFAASDY54E4HDU34875'],
    'Bronco Sport': ['2FRHDUYS2Y63NHD22654']
  };

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.veiculoService.getVehicles().subscribe({
      next: (response) => {
        this.vehicles = response.vehicles;
        if (this.vehicles.length > 0) {
          this.onVehicleChange();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar veículos:', err);
      }
    });
  }

  onVehicleChange(): void {
    this.selectedVehicle = this.vehicles.find(
      v => v.vehicle === this.selectedVehicleName
    ) || null;

    if (this.selectedVehicle) {
      this.loadVehicleData();
    }
  }

  loadVehicleData(): void {
    const vins = this.vinMapping[this.selectedVehicleName] || [];
    this.vehicleData = [];

    vins.forEach(vin => {
      this.veiculoService.getInfoVehicles(vin).subscribe({
        next: (data) => {
          this.vehicleData.push(data);
        },
        error: (err) => {
          console.error(`Erro ao carregar dados do VIN ${vin}:`, err);
        }
      });
    });
  }

  getVehicleImage(): string {
    return this.selectedVehicle?.img as string || '';
  }
}
