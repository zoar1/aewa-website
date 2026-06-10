import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const interest = formData.get("interest") as string;
    const message = formData.get("message") as string;
    const cvFile = formData.get("cv") as File | null;

    if (!name || !email) {
        return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Build attachments array if a CV was uploaded
    const attachments: { filename: string; content: Buffer }[] = [];
    if (cvFile && cvFile.size > 0) {
        if (cvFile.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "CV file must be under 5 MB." }, { status: 400 });
        }
        const bytes = await cvFile.arrayBuffer();
        attachments.push({ filename: cvFile.name, content: Buffer.from(bytes) });
    }

    const { error } = await resend.emails.send({
        from: "careers@aewanl.com",
        to: "enquiries@aewanl.com",
        replyTo: email,
        subject: `CV Submission: ${name}`,
        html: `
            <h2>New CV Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            ${interest ? `<p><strong>Area of Interest:</strong> ${interest}</p>` : ""}
            ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br/>")}</p>` : ""}
            ${attachments.length > 0 ? `<p><strong>CV attached:</strong> ${attachments[0].filename}</p>` : "<p><em>No CV file attached.</em></p>"}
            <hr />
            <p style="color:#888;font-size:12px">Submitted via the All Energy West Africa careers page.</p>
        `,
        attachments,
    });

    if (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
