import { NextRequest, NextResponse } from "next/server";
import { validateLead } from "@/lib/contact";
import { site } from "@/lib/site";
import {
  buildAcknowledgmentEmail,
  buildLeadEmail,
  type EmailContent,
} from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  // Next's internal URL may use localhost behind a reverse proxy. Compare
  // against the incoming Host, which also supports Vercel preview domains.
  let sameOrigin = false;
  try {
    const parsed = new URL(origin || "");
    sameOrigin =
      ["http:", "https:"].includes(parsed.protocol) &&
      parsed.host === request.headers.get("host");
  } catch {
    /* Invalid or absent Origin is rejected below. */
  }
  if (!sameOrigin)
    return NextResponse.json(
      { message: "请求来源无效，请刷新页面后重试。" },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json({ message: "请求格式无效。" }, { status: 415 });

  // Bound the stream itself, rather than trusting Content-Length.
  const reader = request.body?.getReader();
  if (!reader)
    return NextResponse.json({ message: "请填写需求。" }, { status: 400 });
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 24000) {
      await reader.cancel();
      return NextResponse.json(
        { message: "内容过长，请精简后重试。" },
        { status: 413 },
      );
    }
    chunks.push(value);
  }

  let raw: unknown;
  try {
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return NextResponse.json({ message: "请求格式无效。" }, { status: 400 });
  }

  const { data, errors } = validateLead(raw);
  if (!data)
    return NextResponse.json(
      { message: "请检查表单内容。", errors },
      { status: 422 },
    );
  if (data.website)
    return NextResponse.json(
      { message: "提交未完成，请通过邮件联系。" },
      { status: 400 },
    );

  const token = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!token || !accountId || !from)
    return NextResponse.json(
      {
        message:
          "在线表单暂未开通，您的信息尚未发送。请直接发送邮件至 contact@phasetide.com。",
      },
      { status: 503 },
    );

  const send = (to: string, content: EmailContent, replyTo?: string) =>
    fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: [to],
          from: { address: from, name: "PhaseTide 相位潮汐" },
          ...(replyTo ? { reply_to: replyTo } : {}),
          subject: content.subject,
          text: content.text,
          html: content.html,
        }),
        signal: AbortSignal.timeout(10000),
      },
    );

  const lead = buildLeadEmail(data);
  const acknowledgment = buildAcknowledgmentEmail(data);

  try {
    const [leadResult] = await Promise.allSettled([
      send(site.email, lead, data.email),
      send(data.email, acknowledgment),
    ]);

    const leadOk =
      leadResult.status === "fulfilled" && leadResult.value.ok;
    if (!leadOk) throw new Error("Lead delivery failed");

    return NextResponse.json({
      message: "需求已发送。我们会通过您留下的邮箱与您联系。",
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "暂时无法发送，您填写的内容已保留在页面。请稍后重试，或直接发送邮件至 contact@phasetide.com。",
      },
      { status: 502 },
    );
  }
}
