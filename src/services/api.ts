import type { Branch } from "@/types";
import { type RegistrationFormData } from "@/schemas/registrationSchema";

const API_BASE_URL = "http://localhost:3001";

export async function fetchBranches(): Promise<Branch[]> {
  const res = await fetch(`${API_BASE_URL}/branches`);
  if (!res.ok) {
    throw new Error("Failed to fetch branches");
  }
  return res.json();
}

export async function fetchRegistrations(): Promise<any[]> {
  const res = await fetch(`${API_BASE_URL}/registrations`);
  if (!res.ok) {
    throw new Error("Failed to fetch registrations");
  }
  return res.json();
}

export async function submitRegistration(data: RegistrationFormData): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/registrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to submit registration");
  }
}

export async function recordPageView(path: string, sessionId: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/page_views`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path,
      sessionId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }),
  });

  if (!res.ok) {
    console.error("Failed to record page view");
  }
}

export async function fetchPageViews(): Promise<any[]> {
  const res = await fetch(`${API_BASE_URL}/page_views`);
  if (!res.ok) {
    throw new Error("Failed to fetch page views");
  }
  return res.json();
}
