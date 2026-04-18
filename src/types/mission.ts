export type MissionStatus = 'pending' | 'completed';

export interface Mission {
  id: number;
  title: string;
  description: string;
  points: number;
  status: MissionStatus;
  route: string;
}

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 1,
    title: 'Tomar foto',
    description: 'Toma una foto con la cámara',
    points: 30,
    status: 'pending',
    route: '/mission-capture',
  },
  {
    id: 2,
    title: 'Moverse 50 metros',
    description: 'Muévete 50 metros de tu posición original',
    points: 50,
    status: 'pending',
    route: '/mission-movement',
  },
  {
    id: 3,
    title: 'Permanencia activa',
    description: 'Espera 10 segundos quieto sin mover el teléfono',
    points: 40,
    status: 'pending',
    route: '/mission-stay-still',
  },
];
