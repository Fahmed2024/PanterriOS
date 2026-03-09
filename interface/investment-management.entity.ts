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
  data: InvestmentListItem[];
  stats: InvestmentStats;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}
