export interface CaseItem {
  id: string;
  title: string;
  reference: string;
  status: string;
  creationDate: string;
  responsible: string;
  description?: string;
  city?: string;
  state?: string;
  evidence?: string;
}

export interface CaseItemProps {
  caseItem: CaseItem;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, updatedCase: CaseItem) => void;
  isOptionsVisible: boolean;
  onLongPress: (id: string) => void;
  onOutsidePress: () => void;
}