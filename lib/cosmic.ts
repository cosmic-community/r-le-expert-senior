import { createBucketClient } from '@cosmicjs/sdk';
import type {
  CandidateProfile,
  TargetCompany,
  PositioningReport,
  ApproachMessage,
  ConsultantPortfolio,
} from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getCandidates(): Promise<CandidateProfile[]> {
  try {
    const res = await cosmic.objects
      .find({ type: 'candidate-profiles' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    return (res.objects as CandidateProfile[]) ?? [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch candidates');
  }
}

export async function getCandidate(slug: string): Promise<CandidateProfile | null> {
  try {
    const res = await cosmic.objects
      .findOne({ type: 'candidate-profiles', slug })
      .depth(1);
    return (res.object as CandidateProfile) ?? null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw error;
  }
}

export async function getCompanies(): Promise<TargetCompany[]> {
  try {
    const res = await cosmic.objects
      .find({ type: 'target-companies' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    return (res.objects as TargetCompany[]) ?? [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch companies');
  }
}

export async function getCompany(slug: string): Promise<TargetCompany | null> {
  try {
    const res = await cosmic.objects
      .findOne({ type: 'target-companies', slug })
      .depth(1);
    return (res.object as TargetCompany) ?? null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw error;
  }
}

export async function getReports(): Promise<PositioningReport[]> {
  try {
    const res = await cosmic.objects
      .find({ type: 'positioning-reports' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    return (res.objects as PositioningReport[]) ?? [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch reports');
  }
}

export async function getReport(slug: string): Promise<PositioningReport | null> {
  try {
    const res = await cosmic.objects
      .findOne({ type: 'positioning-reports', slug })
      .depth(2);
    return (res.object as PositioningReport) ?? null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw error;
  }
}

export async function getMessages(): Promise<ApproachMessage[]> {
  try {
    const res = await cosmic.objects
      .find({ type: 'approach-messages' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    return (res.objects as ApproachMessage[]) ?? [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch messages');
  }
}

export async function getMessage(slug: string): Promise<ApproachMessage | null> {
  try {
    const res = await cosmic.objects
      .findOne({ type: 'approach-messages', slug })
      .depth(2);
    return (res.object as ApproachMessage) ?? null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw error;
  }
}

export async function getPortfolios(): Promise<ConsultantPortfolio[]> {
  try {
    const res = await cosmic.objects
      .find({ type: 'consultant-portfolios' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    return (res.objects as ConsultantPortfolio[]) ?? [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch portfolios');
  }
}

export async function getPortfolio(slug: string): Promise<ConsultantPortfolio | null> {
  try {
    const res = await cosmic.objects
      .findOne({ type: 'consultant-portfolios', slug })
      .depth(2);
    return (res.object as ConsultantPortfolio) ?? null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw error;
  }
}