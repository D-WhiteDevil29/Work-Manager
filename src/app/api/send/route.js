import { EmailTemplate } from '../../../components/email-template/emailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request, { params }) {
    try {
        const data = await resend.emails.send({
            from: 'Admin <onboarding@resend.dev>',
            to: [`dgshingare29@gmail.com`],
            subject: 'Testing email from Work Manager Application',
            react: EmailTemplate({ firstName: 'Digvijay' }),
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
