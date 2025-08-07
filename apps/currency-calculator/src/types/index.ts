export interface DenominationCount {
  bundle: string;
  open: string;
  total: number;
}

export interface Counts {
  [key: number]: DenominationCount;
}

export interface Calculation {
  id: string;
  note: string;
  created_at: string;
  ist_timestamp: string;
  user_id: string;
}

export interface Denomination {
  denomination: number;
  count: number;
  bundle_count: number;
  open_count: number;
  calculation_id: string;
}

export interface DialogState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'confirm';
  onConfirm?: () => void;
  onClose?: () => void;
}

export interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}
