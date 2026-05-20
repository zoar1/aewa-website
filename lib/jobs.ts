import { ZohoJob, JobsApiResponse } from "@/types/jobs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
const API_URL = `${BASE_URL}/api/jobs`;

/**
 * Fetch all published jobs from the Zoho Recruit API.
 * Uses `cache: "no-store"` to always get fresh data.
 */
export async function fetchJobs(): Promise<ZohoJob[]> {
    try {
        const res = await fetch(API_URL, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`Jobs API responded with status ${res.status}`);
            return [];
        }

        const json: JobsApiResponse = await res.json();

        if (!json?.data || !Array.isArray(json.data)) {
            return [];
        }

        // Only show publicly published jobs, sorted newest first
        return json.data
            .filter((job) => job.Publish === true)
            .sort(
                (a, b) =>
                    new Date(b.Date_Opened).getTime() - new Date(a.Date_Opened).getTime()
            );
    } catch (err) {
        console.error("Failed to fetch jobs:", err);
        return [];
    }
}

/**
 * Get a single job by its Zoho record ID.
 * Fetches all jobs and filters — the endpoint doesn't support individual ID lookup.
 */
export async function getJobById(id: string): Promise<ZohoJob | null> {
    try {
        const res = await fetch(API_URL, {
            cache: "no-store",
        });

        if (!res.ok) return null;

        const json: JobsApiResponse = await res.json();
        return json?.data?.find((job) => job.id === id) ?? null;
    } catch {
        return null;
    }
}
