export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          name: string | null
          subscribed_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          subscribed_at: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          subscribed_at?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

