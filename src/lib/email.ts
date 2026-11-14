import { site } from "./site";

export type EmailContent = {
  subject: string;
  html: string;
};

export type Lead = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
};

const accent = "#2455f5";
const ink = "#111827";
const muted = "#6b7280";
const border = "#e6e8ec";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function layout(inner: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Microsoft YaHei',sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${border};border-radius:12px;">
        <tr>
          <td style="padding:24px 32px 18px;border-bottom:1px solid #f0f2f5;">
            <span style="font-size:19px;font-weight:700;color:${accent};">PhaseTide</span>
            <span style="font-size:12px;color:${muted};margin-left:8px;">相位潮汐</span>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 8px;">${inner}</td>
        </tr>
        <tr>
          <td style="padding:20px 32px 28px;border-top:1px solid #f0f2f5;font-size:12px;line-height:1.7;color:#9ca3af;">
            ${site.company}<br />
            软件开发 · FDE 嵌入式工程 · AI 训练与部署<br />
            邮箱：<a href="mailto:${escapeHtml(site.email)}" style="color:#9ca3af;text-decoration:none;">${escapeHtml(site.email)}</a> · 网站：<a href="${site.url}" style="color:#9ca3af;text-decoration:none;">${site.url.replace(/^https?:\/\//, "")}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function field(label: string, value: string): string {
  return `<tr>
<td style="padding:10px 0;font-size:13px;color:${muted};width:96px;vertical-align:top;">${label}</td>
<td style="padding:10px 0;font-size:14px;color:${ink};">${escapeHtml(value)}</td>
</tr>`;
}

export function buildAcknowledgmentEmail(lead: Lead): EmailContent {
  const subject = `已收到您的咨询 · PhaseTide 相位潮汐`;
  const greeting = `您好，${lead.name}，`;
  const service = lead.service || "您关心的方向";

  const html = layout(`
    <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:${ink};">${escapeHtml(greeting)}</p>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.8;color:#374151;">感谢您联系 <strong>${site.company}</strong>。我们已收到您关于「${escapeHtml(service)}」的咨询，并将尽快安排专人与您联系。</p>
    <p style="margin:0 0 24px;font-size:14px;line-height:1.8;color:#374151;">我们的回复会发送至您留下的邮箱，通常在 <strong>1–2 个工作日</strong>内送达。如您的需求较为紧急，可直接回复本邮件说明。</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0f2f5;">
      ${field("邮箱", lead.email)}
      ${field("公司", lead.company || "未填写")}
      ${field("服务", service)}
    </table>
    <p style="margin:26px 0 0;font-size:14px;line-height:1.8;color:#374151;">此致，<br />PhaseTide 相位潮汐 · ${site.company}</p>
  `);

  return { subject, html };
}

export function buildLeadEmail(lead: Lead): EmailContent {
  const subject = `官网咨询 · ${lead.service} · ${lead.name}`;

  const html = layout(`
    <p style="margin:0 0 20px;font-size:16px;font-weight:600;color:${ink};">新的官网咨询</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0f2f5;">
      ${field("姓名", lead.name)}
      ${field("邮箱", lead.email)}
      ${field("公司", lead.company || "未填写")}
      ${field("服务", lead.service)}
    </table>
    <p style="margin:22px 0 8px;font-size:13px;color:${muted};">项目需求</p>
    <div style="padding:14px 16px;background:#f8fafc;border:1px solid #eef2f7;border-radius:8px;font-size:14px;line-height:1.8;color:#374151;white-space:pre-wrap;">${escapeHtml(lead.message)}</div>
    <p style="margin:22px 0 0;font-size:13px;color:${muted};">客户已同意就此需求联系。直接回复本邮件即可回复客户。</p>
  `);

  return { subject, html };
}
