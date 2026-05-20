export interface ZohoJob {
    id: string;
    Job_Opening_ID: string;
    Job_Opening_Name: string;
    Job_Type: string; // "Full time" | "Contract" | "Part time"
    City: string;
    State: string;
    Country: string;
    Industry: string;
    Job_Description: string;
    Date_Opened: string;
    Target_Date: string | null;
    Job_Opening_Status: string;
    Number_of_Positions: string;
    Publish: boolean;
    Client_Name: {
        name: string;
        id: string;
    };
}

export interface JobsApiResponse {
    data: ZohoJob[];
}
