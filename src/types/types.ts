export interface MessageType {
  text: string;
  time?: string;
  type: 'received' | 'sent';
  id: string;
  timestamp?: number;
}

export interface GlobalStateType {
  idInstance: string;
  apiTokenInstance: string;
  contactNumber: string;
  screen: 'loginForm' | 'contactForm' | 'chat';
}