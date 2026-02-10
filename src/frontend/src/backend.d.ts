import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactRequest {
    id: bigint;
    name: string;
    submittedAt: Time;
    email: string;
    message: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllRequests(): Promise<Array<ContactRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPagedRequests(page: bigint, pageSize: bigint): Promise<Array<ContactRequest>>;
    getRequestById(requestId: bigint): Promise<ContactRequest>;
    getRequestCount(): Promise<bigint>;
    getRequestsByEmail(email: string): Promise<Array<ContactRequest>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactRequest(name: string, email: string, message: string): Promise<bigint>;
}
