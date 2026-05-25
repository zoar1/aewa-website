import { ZohoJob, JobsApiResponse } from "@/types/jobs";

// Call the upstream API directly — avoids any dependency on the deployment URL
const UPSTREAM_URL = "https://eorkh6dh9m50sfq.m.pipedream.net";

/**
 * Fetch all published jobs from the Zoho Recruit API.
 * Revalidates every 5 minutes (300s) so Vercel caches the result.
 */
export async function fetchJobs(): Promise<ZohoJob[]> {
    try {
        const res = await fetch(UPSTREAM_URL, {
            next: { revalidate: 300 },
        });

        if (!res.ok) {
            console.error(`Jobs API responded with status ${res.status}`);
            return [];
        }

        const json: JobsApiResponse = await res.json();

        if (!json?.data || !Array.isArray(json.data)) {
            return [];
        }

        // Show all active jobs (In-progress status), sorted newest first
        return json.data
            .filter((job) =>
                job.Job_Opening_Status?.toLowerCase() === "in-progress" ||
                job.Job_Opening_Status?.toLowerCase() === "active"
            )
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
        const res = await fetch(UPSTREAM_URL, {
            next: { revalidate: 300 },
        });

        if (!res.ok) return null;

        const json: JobsApiResponse = await res.json();
        return json?.data?.find((job) => job.id === id) ?? null;
    } catch {
        return null;
    }
}
