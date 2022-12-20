import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  timesSegundaFasePote1 = [
    'Atlético-MG',
    'Cerro Portenõ - PAR',
    'Sporting Cristal - PER',
    'Millonarios - COL',
    'Independiente Medellin - COL',
    'Huracán - AR',
    'Always Ready - BOL',
    'Fortaleza',
  ];

  timesSegundaFasePote2 = [
    'Universidad Católica - EQU',
    'Magallanes - CHI',
    'Curicó Unico - CHI',
    'Deportivo Maldonado - URU',
    'Carabobo - VEN',
    'CONFRONTO 1',
    'CONFRONTO 2',
    'CONFRONTO 3',
  ];

  timePrimeiraFase = [
    'Nacional Potosí - BOL',
    'El Nacional - EQU',
    'Nacional - PAR',
    'Sport Huancayo - PER',
    'Boston River - URU',
    'Zamora - VEN',
  ];

  chaves: {
    primeiraFase: {
      descricao: string;
      times: string[];
    }[];
    segundaFase: {
      descricao: string;
      times: string[];
    }[];
    terceiraFase: {
      descricao: string;
      times: string[];
    }[];
  } = {
    primeiraFase: [],
    segundaFase: [],
    terceiraFase: [],
  };

  times = {
    faseUm: new Set(),
    faseDoisPoteUm: new Set(),
    faseDoisPoteDois: new Set(),
  };

  ngOnInit(): void {
    this.resetarSorteio();
  }

  resetarSorteio(): void {
    this.times = {
      faseUm: new Set(this.timePrimeiraFase),
      faseDoisPoteUm: new Set(this.timesSegundaFasePote1),
      faseDoisPoteDois: new Set(this.timesSegundaFasePote2),
    };

    this.chaves = {
      primeiraFase: [],
      segundaFase: [],
      terceiraFase: [],
    };
  }

  escolherConfrontoFaseUm(): void {
    const numeroUm = this.generateRandomNumber(0, this.times.faseUm.size);
    const timeUm = [...this.times.faseUm][numeroUm] as string;
    this.times.faseUm.delete(timeUm);

    const numeroDois = this.generateRandomNumber(0, this.times.faseUm.size);
    const timeDois = [...this.times.faseUm][numeroDois] as string;
    this.times.faseUm.delete(timeDois);

    this.chaves.primeiraFase.push({
      descricao: `Confronto ${this.chaves.primeiraFase.length + 1}`,
      times: [timeUm, timeDois],
    });
  }

  escolherConfrontoFaseDois(): void {
    const numeroUm = this.generateRandomNumber(
      0,
      this.times.faseDoisPoteUm.size
    );
    const timeUm = [...this.times.faseDoisPoteUm][numeroUm] as string;
    this.times.faseDoisPoteUm.delete(timeUm);

    const numeroDois = this.generateRandomNumber(
      0,
      this.times.faseDoisPoteDois.size
    );
    const timeDois = [...this.times.faseDoisPoteDois][numeroDois] as string;
    this.times.faseDoisPoteDois.delete(timeDois);

    this.chaves.segundaFase.push({
      descricao: `Jogo ${this.chaves.segundaFase.length + 1}`,
      times: [timeUm, timeDois],
    });

    if (this.chaves.segundaFase.length === 8) {
      this.chaves.terceiraFase.push({
        descricao: `CLASSIFICAÇÃO 1`,
        times: [
          ...this.chaves.segundaFase[0].times,
          ...this.chaves.segundaFase[4].times,
        ],
      });
      this.chaves.terceiraFase.push({
        descricao: `CLASSIFICAÇÃO 2`,
        times: [
          ...this.chaves.segundaFase[1].times,
          ...this.chaves.segundaFase[5].times,
        ],
      });
      this.chaves.terceiraFase.push({
        descricao: `CLASSIFICAÇÃO 3`,
        times: [
          ...this.chaves.segundaFase[2].times,
          ...this.chaves.segundaFase[6].times,
        ],
      });
      this.chaves.terceiraFase.push({
        descricao: `CLASSIFICAÇÃO 4`,
        times: [
          ...this.chaves.segundaFase[3].times,
          ...this.chaves.segundaFase[7].times,
        ],
      });
    }
  }

  private generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
