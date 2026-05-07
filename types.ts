export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicFile {
  url: string;
  imgix_url: string;
}

export type SeniorityLevel = 'Manager' | 'Senior Manager' | 'Director' | 'VP' | 'C-Level';
export type GrowthTrajectory = 'Hypergrowth' | 'Steady Growth' | 'Stable' | 'Restructuring' | 'Decline';
export type ReportStatus = 'Draft' | 'Validated' | 'Sent' | 'Archived';
export type MessageTone = 'Analytical' | 'Strategic' | 'Consultative' | 'Direct';
export type MessageChannel = 'LinkedIn' | 'Email' | 'In-Person' | 'Phone';
export type StatusFlag = 'Draft' | 'Approved' | 'Sent' | 'Replied';
export type SubscriptionTier = 'Solo' | 'Studio' | 'Enterprise';

export interface CandidateProfile extends CosmicObject {
  type: 'candidate-profiles';
  metadata: {
    anonymized_hash?: string;
    display_name?: string;
    current_title?: string;
    years_experience?: number;
    seniority_level?: SeniorityLevel | { value: string; key: string };
    target_sectors?: string[];
    core_expertise?: string;
    business_impact?: string;
    cv_document?: CosmicFile;
    profile_photo?: CosmicFile;
    gdpr_consent?: boolean;
  };
}

export interface TargetCompany extends CosmicObject {
  type: 'target-companies';
  metadata: {
    company_name?: string;
    siren?: string;
    naf_code?: string;
    headquarters_city?: string;
    headcount_range?: string;
    growth_trajectory?: GrowthTrajectory | { value: string; key: string };
    weak_signals?: string;
    relevance_score?: number;
    company_logo?: CosmicFile;
    last_sync?: string;
  };
}

export interface PositioningReport extends CosmicObject {
  type: 'positioning-reports';
  metadata: {
    report_title?: string;
    candidate?: CandidateProfile;
    target_company?: TargetCompany;
    match_score?: number;
    positioning_analysis?: string;
    match_diff?: string;
    recommended_angle?: string;
    report_status?: ReportStatus | { value: string; key: string };
    cover_image?: CosmicFile;
  };
}

export interface ApproachMessage extends CosmicObject {
  type: 'approach-messages';
  metadata: {
    message_title?: string;
    related_report?: PositioningReport;
    recipient_role?: string;
    message_body?: string;
    word_count?: number;
    tone?: MessageTone | { value: string; key: string };
    channel?: MessageChannel | { value: string; key: string };
    status_flag?: StatusFlag | { value: string; key: string };
  };
}

export interface ConsultantPortfolio extends CosmicObject {
  type: 'consultant-portfolios';
  metadata: {
    consultancy_name?: string;
    tenant_id?: string;
    lead_consultant?: string;
    contact_email?: string;
    managed_candidates?: CandidateProfile[];
    brand_color?: string;
    white_label_logo?: CosmicFile;
    subscription_tier?: SubscriptionTier | { value: string; key: string };
    active?: boolean;
  };
}