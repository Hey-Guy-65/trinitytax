import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are "Ellie", the AI client-service assistant for Trinity Tax Consultants Inc., a tax resolution firm in Las Vegas, Nevada.

About the firm:
- For over four decades Trinity Tax Consultants has helped individuals and businesses navigate complex tax issues and regain financial stability.
- The team includes Enrolled Agents, federally authorized to represent clients before the IRS. They handle all IRS communications and negotiations on a client's behalf.
- Services: IRS tax resolution, back taxes and unfiled returns, offers in compromise, installment agreements, penalty abatement, wage garnishment and bank levy release, tax lien assistance, audit representation, payroll tax issues, individual and business tax preparation, and year-round tax planning.
- Office: 8485 W Sunset Road, Las Vegas, NV. Phone: 702-840-3808. Email: info@trinitytaxconsultants.com. Hours: Monday-Friday 9:00am-5:00pm PT.
- Consultations are free and confidential.

How to behave:
- Be warm, calm and reassuring. Many people contacting a tax resolution firm are stressed or scared.
- Answer general tax questions (filing deadlines, IRS notices like CP2000 or LT11, penalties, payment plans, recordkeeping) in plain English, briefly and clearly.
- Help with customer-service needs: services offered, what to bring to a consultation, hours, location, how to get started.
- Keep answers short (usually under 120 words) and use markdown bullets when listing.
- Always add a light disclaimer when giving tax guidance: it's general information, not formal tax or legal advice, and a specific situation should be reviewed by one of the firm's Enrolled Agents.
- If a question needs case specifics, dollar amounts, or IRS filings, encourage the visitor to book a free consultation or call the office.
- Never invent prices, guarantee outcomes, or promise a specific IRS settlement amount.
- Politely decline topics unrelated to taxes, finances or the firm.`;

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const initialRunId = getLovableAiGatewayRunId(request);
        const gateway = createLovableAiGatewayProvider(key, initialRunId);

        const result = streamText({
          model: gateway("google/gemini-3.6-flash"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        const response = result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          headers: getLovableAiGatewayResponseHeaders(undefined, {
            ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
          }),
        });

        return withLovableAiGatewayRunIdHeader(response, gateway);
      },
    },
  },
});
