export interface CreateInvestmentReq {
  propertyName: string;
  propertyType: string;
  state: string;
  city: string;
  fullAddress: string;
  propertyDescription: string;
  targetAmount: number;
  minimumInvestmentAmount: number;
  returnDistributionSchedule: string;
  duration: number;
  expectedReturnPercentage: number;
  riskRating: string;
  investmentPublicationStatus: string;
  propertyValue?: number;
  expectedRoi?: number;
  propertySizeSqm?: number;
  propertyUnit?: string;
  keyHighlights?: string[];
  projectMilestones: ProjectMilestone[];
  documentVisibility?: boolean[];
  coverImageIndex?: number;
  propertyImages: File[];
  propertyDocuments: File[];
}

export interface ProjectMilestone {
  title: string;
  status: string;
  date: string;
  description: string;
}

export interface CreateInvestmentRes {
  message: string;
  data: Record<string, unknown>;
}

export interface RetrieveInvestmentsQuery {
  page?: number;
  limit?: number;
  state?: string;
  investmentStatus?: string;
  search?: string;
  propertyType?: string;
}

export interface InvestmentListItem {
  id: number;
  propertyName: string;
  propertyType: string;
  investmentStatus: string;
  amountRaised: number;
  targetAmount: number;
  funding: number;
  returns: number;
  totalNumberOfInvestors: number;
}

export interface InvestmentStats {
  totalInvestments: number;
  totalRaised: number;
  averageReturn: number;
  totalInvestors: number;
  statusBreakdown: {
    active: number;
    pending: number;
    upcoming: number;
  };
}

export interface InvestmentListRes {
  message: string;
  data: {
  data: InvestmentListItem[];
  stats: InvestmentStats;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}
}

export interface InvestmentDetails {
  id: number;
  propertyName: string;
  propertyType: string;
  investmentPublicationStatus: string;
  investmentStatus: string;
  targetAmount: number;
  expectedReturnPercentage: number;
  images: string[];
  legalDocuments: string[];
}

export interface RetrieveInvestmentDetailsRes {
  message: string;
  data: InvestmentDetails;
}

export interface DocumentUpdate {
  action: 'add' | 'remove' | 'replace';
  index?: number;
  url?: string;
  fileName?: string;
}

export interface ImageUpdate {
  action: 'add' | 'remove' | 'replace';
  index?: number;
  url?: string;
}

export interface UpdateInvestmentReq {
  propertyName?: string;
  propertyType?: string;
  state?: string;
  city?: string;
  fullAddress?: string;
  propertyDescription?: string;
  targetAmount?: number;
  minimumInvestmentAmount?: number;
  returnDistributionSchedule?: string;
  duration?: number;
  expectedReturnPercentage?: number;
  riskRating?: string;
  investmentPublicationStatus?: string;
  propertyValue?: number;
  expectedRoi?: number;
  propertySizeSqm?: number;
  propertyUnit?: string;
  keyHighlights?: string[];
  projectMilestones?: ProjectMilestone[];
  documentVisibility?: boolean[];
  coverImageIndex?: number;
  documentUpdates?: DocumentUpdate[];
  imageUpdates?: ImageUpdate[];
}

export interface UpdateInvestmentRes {
  message: string;
  data: {
    id: number;
    investmentPublicationStatus: string;
  };
}
