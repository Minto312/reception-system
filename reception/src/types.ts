import { UUID } from "crypto";

export interface Reception {
  id: UUID;
  sequenceNumber?: number;
  companyName: string;
  assignedOffice?: string;
  caName?: string;
  customerName: string;
  guestPassNumber?: string;
  visitDateTime?: Date;
  attendedCA?: string;
  customerEmail?: string;
  customerAddress: string;
  customerPhoneNumber?: string;
  officeSalesListID?: string;
}
