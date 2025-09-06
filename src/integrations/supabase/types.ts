export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      comments: {
        Row: {
          action_taken: string | null
          comment_text: string
          created_at: string
          created_by: string | null
          id: string
          issue_id: string
          solution_summary: string | null
          updated_at: string
        }
        Insert: {
          action_taken?: string | null
          comment_text: string
          created_at?: string
          created_by?: string | null
          id?: string
          issue_id: string
          solution_summary?: string | null
          updated_at?: string
        }
        Update: {
          action_taken?: string | null
          comment_text?: string
          created_at?: string
          created_by?: string | null
          id?: string
          issue_id?: string
          solution_summary?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      issues: {
        Row: {
          actual_result: string | null
          assignee: string | null
          attachments: string[] | null
          closed_date: string | null
          created_at: string
          description: string | null
          environment: string | null
          epic_link: string | null
          expected_result: string | null
          id: string
          labels: string[] | null
          priority: string
          project: string | null
          raised_date: string | null
          reported_by: string | null
          sprint: string | null
          status: string
          status_date: string | null
          steps_to_reproduce: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          actual_result?: string | null
          assignee?: string | null
          attachments?: string[] | null
          closed_date?: string | null
          created_at?: string
          description?: string | null
          environment?: string | null
          epic_link?: string | null
          expected_result?: string | null
          id?: string
          labels?: string[] | null
          priority: string
          project?: string | null
          raised_date?: string | null
          reported_by?: string | null
          sprint?: string | null
          status: string
          status_date?: string | null
          steps_to_reproduce?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          actual_result?: string | null
          assignee?: string | null
          attachments?: string[] | null
          closed_date?: string | null
          created_at?: string
          description?: string | null
          environment?: string | null
          epic_link?: string | null
          expected_result?: string | null
          id?: string
          labels?: string[] | null
          priority?: string
          project?: string | null
          raised_date?: string | null
          reported_by?: string | null
          sprint?: string | null
          status?: string
          status_date?: string | null
          steps_to_reproduce?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_role: Database["public"]["Enums"]["app_role"] | null
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_role?: Database["public"]["Enums"]["app_role"] | null
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_role?: Database["public"]["Enums"]["app_role"] | null
        }
        Relationships: []
      }
      test_results: {
        Row: {
          answered_at: string
          correct_answer: string
          created_at: string
          difficulty: string
          id: string
          is_correct: boolean
          question_id: string
          question_text: string
          selected_answer: string
          session_id: string
          topic: string
        }
        Insert: {
          answered_at?: string
          correct_answer: string
          created_at?: string
          difficulty: string
          id?: string
          is_correct: boolean
          question_id: string
          question_text: string
          selected_answer: string
          session_id: string
          topic: string
        }
        Update: {
          answered_at?: string
          correct_answer?: string
          created_at?: string
          difficulty?: string
          id?: string
          is_correct?: boolean
          question_id?: string
          question_text?: string
          selected_answer?: string
          session_id?: string
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "test_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      test_sessions: {
        Row: {
          completed_at: string | null
          correct_answers: number
          created_at: string
          id: string
          started_at: string
          total_questions: number
          total_score: number
          updated_at: string
          user_id: string | null
          user_name: string
          user_role: string
        }
        Insert: {
          completed_at?: string | null
          correct_answers?: number
          created_at?: string
          id?: string
          started_at?: string
          total_questions?: number
          total_score?: number
          updated_at?: string
          user_id?: string | null
          user_name: string
          user_role: string
        }
        Update: {
          completed_at?: string | null
          correct_answers?: number
          created_at?: string
          id?: string
          started_at?: string
          total_questions?: number
          total_score?: number
          updated_at?: string
          user_id?: string | null
          user_name?: string
          user_role?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "trainer" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["trainer", "student"],
    },
  },
} as const
