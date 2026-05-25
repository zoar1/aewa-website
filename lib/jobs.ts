import { ZohoJob } from "@/types/jobs";
import { unstable_cache } from "next/cache";

const TOKEN_URL = "https://accounts.zoho.com/oauth/v2/token";
const JOBS_URL = "https://recruit.zohoapis.com/recruit/v2/JobOpenings";

async function getAccessToken(): Promise<string> {
    const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            client_id: process.env.ZOHO_CLIENT_ID!,
            client_secret: process.env.ZOHO_CLIENT_SECRET!,
            refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
        }),
        cache: "no-store",
    });

    const data = await res.json();

    if (!data.access_token) {
        throw new Error(`Failed to get Zoho access token: ${JSON.stringify(data)}`);
    }

    return data.access_token;
}

// Cache the full job list for 5 minutes
const fetchJobsFromZoho = unstable_cache(
    async (): Promise<ZohoJob[]> => {
        const accessToken = await getAccessToken();

        const res = await fetch(JOBS_URL, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`Zoho Recruit API responded with status ${res.status}`);
            return [];
        }

        const json = await res.json();

        if (!json?.data || !Array.isArray(json.data)) {
            return [];
        }

        return json.data;
    },
    ["zoho-jobs"],
    { revalidate: 300 }
);

/**
 * Fetch all active jobs from Zoho Recruit directly (no Pipedream).
 * Revalidates every 5 minutes (300s).
 */
export async function fetchJobs(): Promise<ZohoJob[]> {
    try {
        const jobs = await fetchJobsFromZoho();

        return jobs
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
 */
export async function getJobById(id: string): Promise<ZohoJob | null> {
    try {
        const jobs = await fetchJobsFromZoho();
        return jobs.find((job) => job.id === id) ?? null;
    } catch {
        return null;
    }
}
