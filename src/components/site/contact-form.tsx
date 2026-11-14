"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CircleCheck, Info, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { serviceOptions } from "@/lib/site";
import { validateLead, type FieldErrors } from "@/lib/contact";
export function ContactForm() {
  const [chosenService, setService] = useState<string | undefined>(undefined);
  const selected = useSearchParams().get("service") || "";
  const service =
    chosenService ??
    ((serviceOptions as readonly string[]).includes(selected) ? selected : "");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const feedback = useRef<HTMLDivElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = {
      ...Object.fromEntries(fields.entries()),
      service,
      consent,
    };
    const result = validateLead(payload);
    setErrors(result.errors);
    setStatus(null);
    if (!result.data) {
      const first = Object.keys(result.errors)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: AbortSignal.timeout(15000),
      });
      const body = await response.json();
      if (body.errors) setErrors(body.errors);
      setStatus({
        success: response.ok,
        message: body.message || "发送失败，请稍后重试。",
      });
      if (response.ok) {
        form.reset();
        setService("");
        setConsent(false);
      }
    } catch {
      setStatus({
        success: false,
        message:
          "网络暂时不可用，您的内容已保留。请重试，或发送邮件至 contact@phasetide.com。",
      });
    } finally {
      setPending(false);
      requestAnimationFrame(() => feedback.current?.focus());
    }
  }
  return (
    <form
      onSubmit={submit}
      noValidate
      aria-label="项目咨询表单"
      className="md:border-l md:border-border md:pl-10 lg:pl-12"
    >
      <FieldGroup>
        <FieldGroup className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">
              姓名 <span className="text-primary">*</span>
            </FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="如何称呼您"
              autoComplete="name"
              maxLength={80}
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            <FieldError id="name-error">{errors.name}</FieldError>
          </Field>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">
              工作邮箱 <span className="text-primary">*</span>
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              maxLength={254}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            <FieldError id="email-error">{errors.email}</FieldError>
          </Field>
        </FieldGroup>
        <Field data-invalid={!!errors.company}>
          <FieldLabel htmlFor="company">
            公司{" "}
            <span className="font-normal text-muted-foreground">（选填）</span>
          </FieldLabel>
          <Input
            id="company"
            name="company"
            placeholder="您的公司或团队名称"
            autoComplete="organization"
            maxLength={120}
            aria-invalid={!!errors.company}
          />
          <FieldError>{errors.company}</FieldError>
        </Field>
        <Field data-invalid={!!errors.service}>
          <FieldLabel htmlFor="service">
            感兴趣的服务 <span className="text-primary">*</span>
          </FieldLabel>
          <NativeSelect
            id="service"
            name="service"
            value={service}
            onChange={(event) => setService(event.target.value)}
            required
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
            className="w-full"
          >
            <NativeSelectOption value="" disabled>
              请选择一个方向
            </NativeSelectOption>
            {serviceOptions.map((option) => (
              <NativeSelectOption key={option} value={option}>
                {option}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <FieldError id="service-error">{errors.service}</FieldError>
        </Field>
        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message">
            项目需求 <span className="text-primary">*</span>
          </FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder="您希望解决什么问题？可以聊聊项目目标、当前进展或预期时间。"
            rows={4}
            minLength={10}
            maxLength={3000}
            required
            aria-invalid={!!errors.message}
            aria-describedby="message-description message-error"
          />
          <FieldDescription id="message-description">
            10–3000 字，无需准备完整的需求文档。
          </FieldDescription>
          <FieldError id="message-error">{errors.message}</FieldError>
        </Field>
        <div hidden aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <Field data-invalid={!!errors.consent}>
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              aria-labelledby="consent-label"
              name="consent"
              checked={consent}
              onCheckedChange={setConsent}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <label
              htmlFor="consent"
              id="consent-label"
              className="text-xs leading-5 text-muted-foreground"
            >
              我同意 PhaseTide 就此需求与我联系，并已阅读
              <Link
                href="/privacy"
                target="_blank"
                className="text-primary underline underline-offset-2"
              >
                隐私说明
              </Link>
              。
            </label>
          </div>
          <FieldError id="consent-error">{errors.consent}</FieldError>
        </Field>
        <Button type="submit" size="lg" disabled={pending} className="w-full">
          {pending ? (
            <>
              <LoaderCircle className="animate-spin" data-icon="inline-start" />
              正在发送…
            </>
          ) : (
            <>
              提交需求
              <ArrowUpRight data-icon="inline-end" />
            </>
          )}
        </Button>
        {status && (
          <div ref={feedback} tabIndex={-1} aria-live="polite">
            <Alert variant={status.success ? "default" : "destructive"}>
              {status.success ? <CircleCheck /> : <Info />}
              <AlertTitle>
                {status.success ? "感谢您的信任" : "尚未发送"}
              </AlertTitle>
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          </div>
        )}
      </FieldGroup>
    </form>
  );
}
