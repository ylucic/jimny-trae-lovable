export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sightings: {
        Row: {
          id: string
          model: 'three-door' | 'five-door'
          color: string
          latitude: number | null
          longitude: number | null
          timestamp: string
          user_id: string
          created_at: string
          updated_at: string
          is_synced: boolean
        }
        Insert: {
          id?: string
          model: 'three-door' | 'five-door'
          color: string
          latitude?: number | null
          longitude?: number | null
          timestamp: string
          user_id: string
          created_at?: string
          updated_at?: string
          is_synced?: boolean
        }
        Update: {
          id?: string
          model?: 'three-door' | 'five-door'
          color?: string
          latitude?: number | null
          longitude?: number | null
          timestamp?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          is_synced?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          display_name: string
          email: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name: string
          email: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string
          email?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}