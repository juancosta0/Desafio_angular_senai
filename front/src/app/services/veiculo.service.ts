import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { VeiculosAPI } from "../models/veiculo.model";
import { InfoVeiculo } from "../models/InfoVeiculo.model";

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private urlVeiculo : string = `${environment.api}/vehicles`;
  private urlVeiculoData : string = `${environment.api}/vehicleData`;

  public constructor(private httpClient: HttpClient) {}

  public getVehicles() : Observable<VeiculosAPI> {
    return this.httpClient.get<VeiculosAPI>(this.urlVeiculo);
  }

  public getInfoVehicles(vin : String) : Observable<InfoVeiculo>{
    return this.httpClient.post<InfoVeiculo>(this.urlVeiculoData, { vin });
  }
}
