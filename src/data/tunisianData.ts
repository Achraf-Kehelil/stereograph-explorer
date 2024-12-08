import { addDays, subDays } from 'date-fns';
import { Prison, Region } from '@/types';

export const tunisianPrisons: Prison[] = [
  { id: '1', name: 'Prison civile de Mornaguia', region: 'Tunis' },
  { id: '2', name: 'Prison civile de Borj El Amri', region: 'Tunis' },
  { id: '3', name: 'Prison civile de Messadine', region: 'Sousse' },
  { id: '4', name: 'Prison civile de Monastir', region: 'Monastir' },
  { id: '5', name: 'Prison civile de Sfax', region: 'Sfax' },
  { id: '6', name: 'Prison civile de Gabès', region: 'Gabès' },
];

export const tunisianRegions: Region[] = [
  'Tunis',
  'Ariana',
  'Ben Arous',
  'Manouba',
  'Nabeul',
  'Zaghouan',
  'Bizerte',
  'Béja',
  'Jendouba',
  'Le Kef',
  'Siliana',
  'Sousse',
  'Monastir',
  'Mahdia',
  'Sfax',
  'Kairouan',
  'Kasserine',
  'Sidi Bouzid',
  'Gabès',
  'Médenine',
  'Tataouine',
  'Gafsa',
  'Tozeur',
  'Kebili',
];

export function generateTunisianName(): string {
  const firstNames = [
    'Mohamed', 'Ahmed', 'Ali', 'Youssef', 'Omar', 'Amine', 'Aymen',
    'Sami', 'Karim', 'Nizar', 'Slim', 'Mehdi', 'Wassim', 'Hamza',
    'Fatma', 'Mariem', 'Ines', 'Amira', 'Nour', 'Rania', 'Yasmine',
    'Sarra', 'Asma', 'Rim', 'Hela', 'Emna', 'Syrine', 'Yassmine'
  ];
  
  const lastNames = [
    'Ben Ali', 'Ben Ahmed', 'Ben Salah', 'Ben Ammar', 'Ben Youssef',
    'Trabelsi', 'Bouazizi', 'Gharbi', 'Chebbi', 'Mejri', 'Brahmi',
    'Jebali', 'Laabidi', 'Mansouri', 'Rezgui', 'Saidi', 'Tlili'
  ];

  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`;
}

export function generateTunisianCIN(): string {
  return `${Math.floor(Math.random() * 10)}${String(
    Math.floor(Math.random() * 999999)
  ).padStart(6, '0')}`;
}

export function generateTunisianPhoneNumber(): string {
  const prefixes = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '50', '51', '52', '53', '54', '55'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = String(Math.floor(Math.random() * 999999)).padStart(6, '0');
  return `${prefix}${number}`;
}

export function generateTunisianAddress(): string {
  const streets = [
    'Rue de la République',
    'Avenue Habib Bourguiba',
    'Rue Charles de Gaulle',
    'Avenue de Paris',
    'Rue Ibn Khaldoun',
    'Avenue de Carthage',
    'Rue de Rome'
  ];

  const cities = [
    'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabès',
    'Ariana', 'Gafsa', 'Monastir', 'Ben Arous', 'La Marsa'
  ];

  const street = streets[Math.floor(Math.random() * streets.length)];
  const number = Math.floor(Math.random() * 100) + 1;
  const city = cities[Math.floor(Math.random() * cities.length)];
  const postalCode = Math.floor(Math.random() * 8999) + 1000;

  return `${number}, ${street}, ${postalCode} ${city}, Tunisie`;
}