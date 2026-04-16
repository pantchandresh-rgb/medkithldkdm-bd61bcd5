export interface DietitianRequest {
  id: string;
  name: string;
  phone: string;
  concern: string;
  preferredTime: string;
  createdAt: string;
  status: "Pending" | "Contacted" | "Completed";
}

const STORAGE_KEY = "medkit-dietitian-requests";

export function getDietitianRequests(): DietitianRequest[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addDietitianRequest(
  req: Pick<DietitianRequest, "name" | "phone" | "concern" | "preferredTime">
): DietitianRequest {
  const entry: DietitianRequest = {
    ...req,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "Pending",
  };
  const requests = getDietitianRequests();
  requests.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  return entry;
}

export function updateDietitianStatus(id: string, status: DietitianRequest["status"]): void {
  const requests = getDietitianRequests();
  const idx = requests.findIndex((r) => r.id === id);
  if (idx !== -1) {
    requests[idx].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }
}
