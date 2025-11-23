import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  selectedVehicleName: string = 'Ranger';

  // Lista completa de dados (cache de todos os carros)
  vehicleData: InfoVeiculo[] = [];

  // Variáveis para a Busca na Linha Única
  codVinBusca: string = '';
  veiculoEncontrado: InfoVeiculo | null = null;

  // Mapeamento completo dos VINs
  vinMapping: { [key: string]: string[] } = {
    'Ranger': ['2FRHDUYS2Y63NHD22454', '2FRHDUYS2Y63NHD22455', '2FRHDUYS2Y63NHD22654'],
    'Mustang': ['2RFAASDY54E4HDU34874', '2FRHDUYS2Y63NHD22854'],
    'Territory': ['2RFAASDY54E4HDU34875'],
    'Bronco Sport': ['2FRHDUYS2Y63NHD22654']
  };

  constructor(private veiculoService: VeiculoService, private router: Router) {}

  ngOnInit(): void {
    this.loadVehicles();
    this.loadAllVehicleData(); // Carrega TUDO ao iniciar
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loadVehicles(): void {
    this.veiculoService.getVehicles().subscribe({
      next: (response) => {
        this.vehicles = response.vehicles;
        // Apenas define o veículo selecionado visualmente, sem recarregar dados da tabela
        this.updateSelectedVehicle();
      },
      error: (err) => {
        console.error('Erro ao carregar veículos:', err);
      }
    });
  }

  onVehicleChange(): void {
    // Quando troca o dropdown, atualizamos apenas os Cards e a Imagem
    this.updateSelectedVehicle();

    // Opcional: Se quiser limpar a busca ao trocar de carro
    this.codVinBusca = '';
    this.veiculoEncontrado = null;
  }

  updateSelectedVehicle(): void {
    this.selectedVehicle = this.vehicles.find(
      v => v.vehicle === this.selectedVehicleName
    ) || null;
  }

  // CORREÇÃO PRINCIPAL AQUI:
  loadAllVehicleData(): void {
    // Pega TODOS os VINs de TODOS os arrays do mapeamento e junta em um só
    const allVins = Object.values(this.vinMapping).flat();

    this.vehicleData = []; // Limpa

    allVins.forEach(vin => {
      this.veiculoService.getInfoVehicles(vin).subscribe({
        next: (data) => {
          // Salva na lista global
          const veiculoComVin = { ...data, vinCode: vin } as InfoVeiculo;
          this.vehicleData.push(veiculoComVin);
        },
        error: (err) => {
          console.error(`Erro ao carregar dados do VIN ${vin}:`, err);
        }
      });
    });
  }

  buscarVeiculo(): void {
    if (!this.codVinBusca || this.codVinBusca.trim() === '') {
      this.veiculoEncontrado = null;
      return;
    }

    // Agora busca na lista completa (vehicleData contém Ranger, Mustang, Territory, etc.)
    this.veiculoEncontrado = this.vehicleData.find(v =>
      v.vinCode && v.vinCode.toLowerCase().includes(this.codVinBusca.toLowerCase())
    ) || null;
  }

  getVehicleImage(): string {
    return this.selectedVehicle?.img as string || '';
  }
}
