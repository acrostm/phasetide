import { serviceOptions } from "./site";
export type Lead = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
  website: string;
};
export type FieldErrors = Partial<Record<keyof Lead, string>>;
export function validateLead(value: unknown): {
  data?: Lead;
  errors: FieldErrors;
} {
  const raw =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};
  const string = (key: string) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";
  const data: Lead = {
    name: string("name"),
    email: string("email"),
    company: string("company"),
    service: string("service"),
    message: string("message"),
    website: string("website"),
    consent: raw.consent === true,
  };
  const errors: FieldErrors = {};
  if (!data.name || data.name.length > 80)
    errors.name = "请填写姓名（不超过 80 字）。";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254)
    errors.email = "请填写有效的邮箱地址。";
  if (data.company.length > 120)
    errors.company = "公司名称请控制在 120 字以内。";
  if (!(serviceOptions as readonly string[]).includes(data.service))
    errors.service = "请选择您感兴趣的服务。";
  if (data.message.length < 10 || data.message.length > 3000)
    errors.message = "请用 10–3000 字介绍您的需求。";
  if (!data.consent) errors.consent = "请同意我们就此需求与您联系。";
  return Object.keys(errors).length ? { errors } : { data, errors };
}
