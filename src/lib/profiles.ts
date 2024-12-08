import { create } from 'zustand';
import { Prisoner, Visitor, CallRecord } from '@/types';

interface ProfilesState {
  selectedPrisoner: Prisoner | null;
  selectedVisitor: Visitor | null;
  prisonerCalls: CallRecord[];
  visitorCalls: CallRecord[];
  setPrisoner: (prisoner: Prisoner | null) => void;
  setVisitor: (visitor: Visitor | null) => void;
  updatePrisonerCalls: (calls: CallRecord[]) => void;
  updateVisitorCalls: (calls: CallRecord[]) => void;
}

export const useProfiles = create<ProfilesState>((set) => ({
  selectedPrisoner: null,
  selectedVisitor: null,
  prisonerCalls: [],
  visitorCalls: [],
  setPrisoner: (prisoner) => set({ selectedPrisoner: prisoner }),
  setVisitor: (visitor) => set({ selectedVisitor: visitor }),
  updatePrisonerCalls: (calls) => set({ prisonerCalls: calls }),
  updateVisitorCalls: (calls) => set({ visitorCalls: calls }),
}));

export function filterCallsByPrisoner(calls: CallRecord[], prisonerId: string): CallRecord[] {
  return calls.filter((call) => call.prisonerId === prisonerId);
}

export function filterCallsByVisitor(calls: CallRecord[], visitorId: string): CallRecord[] {
  return calls.filter((call) => call.visitorId === visitorId);
}

export function getCallStatistics(calls: CallRecord[]) {
  return {
    totalCalls: calls.length,
    totalDuration: calls.reduce((acc, call) => acc + call.duration, 0),
    averageDuration: calls.length
      ? calls.reduce((acc, call) => acc + call.duration, 0) / calls.length
      : 0,
    flaggedCalls: calls.filter((call) => call.status === 'flagged').length,
  };
}