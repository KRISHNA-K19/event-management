export type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url?: string;
  imageUrl?: string; // Compatibility bridge
  date?: string;     // Compatibility bridge
  location?: string;
  created_at: string;
};

export type Application = {
  id: string;
  event_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};

export type Profile = {
  id: string;
  role: 'user' | 'admin';
};
