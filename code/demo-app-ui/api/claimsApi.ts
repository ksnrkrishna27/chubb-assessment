import { APIRequestContext, APIResponse } from "@playwright/test";

export interface ClaimRequest {
  incidentDate: string;
  incidentLocation: string;
  description: string;
  claimAmount: number;
}

export type ClaimResponse = {
  claimId: string;
  userId: string;
  incidentDate: string;
  incidentLocation: string;
  description: string;
  claimAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export class ClaimsApi {
  private readonly baseUrl = "http://localhost:8090";

  constructor(private readonly request: APIRequestContext) {}

  async login(email: string, password: string): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/auth/login`, {
      data: { email, password },
    });
  }

  async submitClaim(claim: Partial<ClaimRequest>): Promise<APIResponse> {
    const cookies = (await this.request.storageState()).cookies;
    const csrfCookie = cookies.find((cookie) => cookie.name === "XSRF-TOKEN");

    return this.request.post(`${this.baseUrl}/api/claims`, {
      data: claim,
      headers: csrfCookie
        ? { "X-XSRF-TOKEN": decodeURIComponent(csrfCookie.value) }
        : undefined,
    });
  }
}

export function assertClaimResponseSchema(body: unknown): asserts body is ClaimResponse {
  if (!body || typeof body !== "object") {
    throw new Error("Claim response must be an object");
  }

  const response = body as Record<string, unknown>;
  const requiredStringFields = [
    "claimId",
    "userId",
    "incidentDate",
    "incidentLocation",
    "description",
    "status",
    "createdAt",
    "updatedAt",
  ];

  for (const field of requiredStringFields) {
    if (typeof response[field] !== "string" || response[field] === "") {
      throw new Error(`Claim response field '${field}' must be a non-empty string`);
    }
  }

  if (typeof response.claimAmount !== "number") {
    throw new Error("Claim response field 'claimAmount' must be a number");
  }
}
