export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calendar_dates: {
        Row: {
          date: string | null
          exception_type: number | null
          id: number
          service_id: string | null
        }
        Insert: {
          date?: string | null
          exception_type?: number | null
          id?: number
          service_id?: string | null
        }
        Update: {
          date?: string | null
          exception_type?: number | null
          id?: number
          service_id?: string | null
        }
        Relationships: []
      }
      departures: {
        Row: {
          announcement_timestamp: string | null
          departure_timestamp: string | null
          id: number
          run_date: string | null
          sched_hit: boolean | null
          sched_track: number | null
          track: number | null
          train_id: string | null
          train_num: number | null
        }
        Insert: {
          announcement_timestamp?: string | null
          departure_timestamp?: string | null
          id?: number
          run_date?: string | null
          sched_hit?: boolean | null
          sched_track?: number | null
          track?: number | null
          train_id?: string | null
          train_num?: number | null
        }
        Update: {
          announcement_timestamp?: string | null
          departure_timestamp?: string | null
          id?: number
          run_date?: string | null
          sched_hit?: boolean | null
          sched_track?: number | null
          track?: number | null
          train_id?: string | null
          train_num?: number | null
        }
        Relationships: []
      }
      departures_raw: {
        Row: {
          departure_data: Json | null
          id: number
          timestamp: string | null
        }
        Insert: {
          departure_data?: Json | null
          id?: number
          timestamp?: string | null
        }
        Update: {
          departure_data?: Json | null
          id?: number
          timestamp?: string | null
        }
        Relationships: []
      }
      routes: {
        Row: {
          id: number
          route_color: string | null
          route_id: number | null
          route_long_name: string | null
          route_text_color: string | null
          route_type: number | null
        }
        Insert: {
          id?: number
          route_color?: string | null
          route_id?: number | null
          route_long_name?: string | null
          route_text_color?: string | null
          route_type?: number | null
        }
        Update: {
          id?: number
          route_color?: string | null
          route_id?: number | null
          route_long_name?: string | null
          route_text_color?: string | null
          route_type?: number | null
        }
        Relationships: []
      }
      stop_times: {
        Row: {
          arrival_time: string | null
          departure_time: string | null
          drop_off_type: number | null
          id: number
          pickup_type: number | null
          stop_id: number | null
          stop_sequence: number | null
          trip_id: string | null
        }
        Insert: {
          arrival_time?: string | null
          departure_time?: string | null
          drop_off_type?: number | null
          id?: number
          pickup_type?: number | null
          stop_id?: number | null
          stop_sequence?: number | null
          trip_id?: string | null
        }
        Update: {
          arrival_time?: string | null
          departure_time?: string | null
          drop_off_type?: number | null
          id?: number
          pickup_type?: number | null
          stop_id?: number | null
          stop_sequence?: number | null
          trip_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_stops"
            columns: ["stop_id"]
            isOneToOne: false
            referencedRelation: "stops"
            referencedColumns: ["stop_id"]
          },
          {
            foreignKeyName: "fk_trips"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["trip_id"]
          },
        ]
      }
      stops: {
        Row: {
          id: number
          stop_code: string | null
          stop_coordinate: unknown | null
          stop_id: number | null
          stop_name: string | null
          stop_url: string | null
          wheelchair_boarding: number | null
        }
        Insert: {
          id?: number
          stop_code?: string | null
          stop_coordinate?: unknown | null
          stop_id?: number | null
          stop_name?: string | null
          stop_url?: string | null
          wheelchair_boarding?: number | null
        }
        Update: {
          id?: number
          stop_code?: string | null
          stop_coordinate?: unknown | null
          stop_id?: number | null
          stop_name?: string | null
          stop_url?: string | null
          wheelchair_boarding?: number | null
        }
        Relationships: []
      }
      transfers: {
        Row: {
          from_stop_id: number | null
          from_trip_id: string | null
          id: number
          min_transfer_time: string | null
          to_stop_id: number | null
          to_trip_id: string | null
          transfer_type: number | null
        }
        Insert: {
          from_stop_id?: number | null
          from_trip_id?: string | null
          id?: number
          min_transfer_time?: string | null
          to_stop_id?: number | null
          to_trip_id?: string | null
          transfer_type?: number | null
        }
        Update: {
          from_stop_id?: number | null
          from_trip_id?: string | null
          id?: number
          min_transfer_time?: string | null
          to_stop_id?: number | null
          to_trip_id?: string | null
          transfer_type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_from_stops"
            columns: ["from_stop_id"]
            isOneToOne: false
            referencedRelation: "stops"
            referencedColumns: ["stop_id"]
          },
          {
            foreignKeyName: "fk_from_trips"
            columns: ["from_trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["trip_id"]
          },
          {
            foreignKeyName: "fk_to_stops"
            columns: ["to_stop_id"]
            isOneToOne: false
            referencedRelation: "stops"
            referencedColumns: ["stop_id"]
          },
          {
            foreignKeyName: "fk_to_trips"
            columns: ["to_trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["trip_id"]
          },
        ]
      }
      trips: {
        Row: {
          direction_id: number | null
          id: number
          peak_offpeak: number | null
          route_id: number | null
          service_id: string | null
          shape_id: string | null
          trip_headsign: string | null
          trip_id: string | null
          trip_short_name: number | null
        }
        Insert: {
          direction_id?: number | null
          id?: number
          peak_offpeak?: number | null
          route_id?: number | null
          service_id?: string | null
          shape_id?: string | null
          trip_headsign?: string | null
          trip_id?: string | null
          trip_short_name?: number | null
        }
        Update: {
          direction_id?: number | null
          id?: number
          peak_offpeak?: number | null
          route_id?: number | null
          service_id?: string | null
          shape_id?: string | null
          trip_headsign?: string | null
          trip_id?: string | null
          trip_short_name?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_routes"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["route_id"]
          },
        ]
      }
    }
    Views: {
      lastndepartures: {
        Row: {
          array_agg: Json[] | null
          train_num: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
    PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
    PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never

