export interface Guest {
  id: string;
  name: string;
  adults: number;
  children: number;
  phone: string;
  observations?: string;
  created_at: string;
}

export interface RSVPFormData {
  name: string;
  adults: number;
  children: number;
  phone: string;
  observations?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  character: string;
}
