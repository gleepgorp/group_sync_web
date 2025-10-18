/**
 * Domain type definitions for GroupSync application
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initial: string;
}

export interface Group {
  id: string;
  name: string;
  memberCount: number;
  members: User[];
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  votes: number;
}

export interface AvailabilitySlot {
  date: string;
  isAvailable: boolean;
}

export interface CommonSlot {
  date: string;
  hasCommonTime: boolean;
}

export interface GroupSchedule {
  groupId: string;
  groupName: string;
  memberCount: number;
  commonSlotsCount: number;
  slots: CommonSlot[];
}

