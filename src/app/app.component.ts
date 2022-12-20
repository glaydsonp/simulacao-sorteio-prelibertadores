import { Component, OnInit } from '@angular/core';

interface Time {
  nome: string;
  imagem: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  timesSegundaFasePote1: Time[] = [
    {
      nome: 'Atlético-MG',
      imagem: './assets/times/atletico.png',
    },
    {
      nome: 'Cerro Portenõ - PAR',
      imagem: './assets/times/cerro.png',
    },
    {
      nome: 'Sporting Cristal - PER',
      imagem: './assets/times/cristal.png',
    },
    {
      nome: 'Millonarios - COL',
      imagem: './assets/times/millonarios.png',
    },
    {
      nome: 'Independiente Medellin - COL',
      imagem: './assets/times/medellin.png',
    },
    {
      nome: 'Huracán - AR',
      imagem: './assets/times/huracan.png',
    },
    {
      nome: 'Always Ready - BOL',
      imagem: './assets/times/ready.png',
    },
    {
      nome: 'Fortaleza',
      imagem: './assets/times/fortaleza.png',
    },
  ];

  timesSegundaFasePote2: Time[] = [
    {
      nome: 'Universidad Católica - EQU',
      imagem: './assets/times/catolica.png',
    },
    {
      nome: 'Magallanes - CHI',
      imagem: './assets/times/magallanes.png',
    },
    {
      nome: 'Curicó Unico - CHI',
      imagem: './assets/times/curico.png',
    },
    {
      nome: 'Deportivo Maldonado - URU',
      imagem: './assets/times/maldonado.png',
    },
    {
      nome: 'Carabobo - VEN',
      imagem: './assets/times/caraboo.png',
    },
    {
      nome: 'CONFRONTO 1',
      imagem: './assets/times/e1.png',
    },
    {
      nome: 'CONFRONTO 2',
      imagem: './assets/times/e2.png',
    },
    {
      nome: 'CONFRONTO 3',
      imagem: './assets/times/e3.png',
    },
  ];

  timePrimeiraFasePote1: Time[] = [
    {
      nome: 'El Nacional - EQU',
      imagem: './assets/times/el-nacional.png',
    },
    {
      nome: 'Nacional - PAR',
      imagem: './assets/times/nacional.png',
    },
    {
      nome: 'Zamora - VEN',
      imagem: './assets/times/zamora.png',
    },
  ];

  timePrimeiraFasePote2: Time[] = [
    {
      nome: 'Nacional Potosí - BOL',
      imagem: './assets/times/potosi.png',
    },
    {
      nome: 'Sport Huancayo - PER',
      imagem: './assets/times/huancayo.png',
    },
    {
      nome: 'Boston River - URU',
      imagem: './assets/times/boston.png',
    },
  ];

  chaves: {
    primeiraFase: {
      descricao: string;
      times: Time[];
    }[];
    segundaFase: {
      descricao: string;
      times: Time[];
    }[];
    terceiraFase: {
      descricao: string;
      times: Time[];
    }[];
  } = {
    primeiraFase: [],
    segundaFase: [],
    terceiraFase: [],
  };

  times = {
    faseUmPoteUm: new Set<Time>(),
    faseUmPoteDois: new Set<Time>(),
    faseDoisPoteUm: new Set<Time>(),
    faseDoisPoteDois: new Set<Time>(),
  };

  ngOnInit(): void {
    this.resetarSorteio();
  }

  resetarSorteio(): void {
    this.times = {
      faseUmPoteUm: new Set(this.timePrimeiraFasePote1),
      faseUmPoteDois: new Set(this.timePrimeiraFasePote2),
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
    const numeroUm = this.generateRandomNumber(0, this.times.faseUmPoteUm.size);
    const timeUm = [...this.times.faseUmPoteUm][numeroUm] as Time;
    this.times.faseUmPoteUm.delete(timeUm);

    const numeroDois = this.generateRandomNumber(
      0,
      this.times.faseUmPoteDois.size
    );
    const timeDois = [...this.times.faseUmPoteDois][numeroDois] as Time;
    this.times.faseUmPoteDois.delete(timeDois);

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
    const timeUm = [...this.times.faseDoisPoteUm][numeroUm] as Time;
    this.times.faseDoisPoteUm.delete(timeUm);

    const numeroDois = this.generateRandomNumber(
      0,
      this.times.faseDoisPoteDois.size
    );
    const timeDois = [...this.times.faseDoisPoteDois][numeroDois] as Time;
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
          ...this.chaves.segundaFase[7].times,
        ],
      });
      this.chaves.terceiraFase.push({
        descricao: `CLASSIFICAÇÃO 2`,
        times: [
          ...this.chaves.segundaFase[1].times,
          ...this.chaves.segundaFase[6].times,
        ],
      });
      this.chaves.terceiraFase.push({
        descricao: `CLASSIFICAÇÃO 3`,
        times: [
          ...this.chaves.segundaFase[2].times,
          ...this.chaves.segundaFase[5].times,
        ],
      });
      this.chaves.terceiraFase.push({
        descricao: `CLASSIFICAÇÃO 4`,
        times: [
          ...this.chaves.segundaFase[3].times,
          ...this.chaves.segundaFase[4].times,
        ],
      });
    }
  }

  private generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
