import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, email, phone, message, jobTitle, jobId } = body;

    if (!name || !email) {
        return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
        from: "careers@aewanl.com",
        to: "enquiries@aewanl.com",
        replyTo: email,
        subject: `Job Application: ${jobTitle}`,
        html: `
            <h2>New Job Application</h2>
            <p><strong>Role:</strong> ${jobTitle}</p>
            <p><strong>Job ID:</strong> ${jobId}</p>
            <hr />
            <p><strong>Applicant Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            ${message ? `<p><strong>Cover Note:</strong></p><p>${message.replace(/\n/g, "<br/>")}</p>` : ""}
            <hr />
            <p style="color:#888;font-size:12px">Submitted via the All Energy West Africa website.</p>
        `,
    });

    if (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
