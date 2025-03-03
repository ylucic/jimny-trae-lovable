import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import type { Database } from './database.types';
import type { Sighting } from './types';

type DbSighting = Database['public']['Tables']['sightings']['Row'];

const OFFLINE_SIGHTINGS_KEY = 'offline_sightings';

export class DataService {
  private static instance: DataService;

  private constructor() {}

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  async saveSighting(sighting: Omit<Sighting, 'id'>): Promise<{ data: Sighting | null; error: Error | null }> {
    const newSighting: DbSighting = {
      id: uuidv4(),
      model: sighting.model,
      color: sighting.color,
      latitude: sighting.latitude || null,
      longitude: sighting.longitude || null,
      timestamp: sighting.timestamp,
      user_id: sighting.userId || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_synced: navigator.onLine
    };

    if (!navigator.onLine) {
      return this.saveOfflineSighting(newSighting);
    }

    const { data, error } = await supabase
      .from('sightings')
      .insert([newSighting])
      .select()
      .single();

    if (error) {
      console.error('Error saving sighting:', error);
      return { data: null, error };
    }

    return { 
      data: this.mapDbSightingToSighting(data),
      error: null 
    };
  }

  private saveOfflineSighting(sighting: DbSighting): Promise<{ data: Sighting | null; error: Error | null }> {
    try {
      const offlineSightings = this.getOfflineSightings();
      offlineSightings.push(sighting);
      localStorage.setItem(OFFLINE_SIGHTINGS_KEY, JSON.stringify(offlineSightings));
      
      return Promise.resolve({
        data: this.mapDbSightingToSighting(sighting),
        error: null
      });
    } catch (error) {
      console.error('Error saving offline sighting:', error);
      return Promise.resolve({
        data: null,
        error: new Error('Failed to save offline sighting')
      });
    }
  }

  private getOfflineSightings(): DbSighting[] {
    try {
      const sightings = localStorage.getItem(OFFLINE_SIGHTINGS_KEY);
      return sightings ? JSON.parse(sightings) : [];
    } catch {
      return [];
    }
  }

  async syncOfflineSightings(): Promise<void> {
    if (!navigator.onLine) return;

    const offlineSightings = this.getOfflineSightings();
    if (offlineSightings.length === 0) return;

    const { error } = await supabase
      .from('sightings')
      .insert(offlineSightings);

    if (!error) {
      localStorage.removeItem(OFFLINE_SIGHTINGS_KEY);
    } else {
      console.error('Error syncing offline sightings:', error);
    }
  }

  async getUserSightings(userId: string): Promise<{ data: Sighting[]; error: Error | null }> {
    const { data, error } = await supabase
      .from('sightings')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching user sightings:', error);
      return { data: [], error };
    }

    const offlineSightings = this.getOfflineSightings()
      .filter(s => s.user_id === userId)
      .map(this.mapDbSightingToSighting);

    const onlineSightings = (data || []).map(this.mapDbSightingToSighting);

    return {
      data: [...offlineSightings, ...onlineSightings],
      error: null
    };
  }

  private mapDbSightingToSighting(dbSighting: DbSighting): Sighting {
    return {
      id: dbSighting.id,
      model: dbSighting.model,
      color: dbSighting.color,
      latitude: dbSighting.latitude || undefined,
      longitude: dbSighting.longitude || undefined,
      timestamp: dbSighting.timestamp,
      userId: dbSighting.user_id
    };
  }
}

// Initialize online/offline sync listeners
window.addEventListener('online', () => {
  DataService.getInstance().syncOfflineSightings();
});

export const dataService = DataService.getInstance();