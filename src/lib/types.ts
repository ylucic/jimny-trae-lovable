
export interface Sighting {
  id: string;
  model: 'three-door' | 'five-door';
  color: string;
  latitude?: number;
  longitude?: number;
  timestamp: string;
  userId?: string;
}

export interface SightingStats {
  totalSightings: number;
  mostFrequentColor: {
    color: string;
    count: number;
  } | null;
  byModel: {
    'three-door': number;
    'five-door': number;
  };
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
}
