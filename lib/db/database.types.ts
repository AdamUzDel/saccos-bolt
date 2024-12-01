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
      users: {
        Row: {
          id: string
          email: string
          role: 'app_admin' | 'sacco_admin' | 'sacco_agent' | 'sacco_user'
          sacco_id: string | null
          first_name: string
          last_name: string
          phone_number: string
          profile_image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'app_admin' | 'sacco_admin' | 'sacco_agent' | 'sacco_user'
          sacco_id?: string | null
          first_name: string
          last_name: string
          phone_number: string
          profile_image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'app_admin' | 'sacco_admin' | 'sacco_agent' | 'sacco_user'
          sacco_id?: string | null
          first_name?: string
          last_name?: string
          phone_number?: string
          profile_image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      saccos: {
        Row: {
          id: string
          name: string
          description: string | null
          logo_url: string | null
          address: string
          phone_number: string
          email: string
          registration_number: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          logo_url?: string | null
          address: string
          phone_number: string
          email: string
          registration_number: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          address?: string
          phone_number?: string
          email?: string
          registration_number?: string
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          sacco_id: string
          type: 'SAVINGS' | 'WITHDRAWAL' | 'LOAN' | 'LOAN_REPAYMENT'
          amount: number
          status: 'PENDING' | 'APPROVED' | 'REJECTED'
          approved_by: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          sacco_id: string
          type: 'SAVINGS' | 'WITHDRAWAL' | 'LOAN' | 'LOAN_REPAYMENT'
          amount: number
          status: 'PENDING' | 'APPROVED' | 'REJECTED'
          approved_by?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          sacco_id?: string
          type?: 'SAVINGS' | 'WITHDRAWAL' | 'LOAN' | 'LOAN_REPAYMENT'
          amount?: number
          status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          approved_by?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      loans: {
        Row: {
          id: string
          user_id: string
          sacco_id: string
          amount: number
          interest_rate: number
          duration: number
          status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID'
          approved_by: string | null
          approved_at: string | null
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          sacco_id: string
          amount: number
          interest_rate: number
          duration: number
          status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID'
          approved_by?: string | null
          approved_at?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          sacco_id?: string
          amount?: number
          interest_rate?: number
          duration?: number
          status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID'
          approved_by?: string | null
          approved_at?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}