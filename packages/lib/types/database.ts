export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
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
