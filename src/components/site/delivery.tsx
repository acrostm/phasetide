import { deliverySteps } from "@/lib/site";
export function Delivery() {
  return (
    <section
      id="delivery"
      className="bg-inverse text-inverse-foreground"
      aria-labelledby="delivery-title"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            id="delivery-title"
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            好的交付，
            <br className="md:hidden" />
            始于同频。
          </h2>
          <p className="max-w-sm text-sm leading-7 text-inverse-muted">
            以可验证的节奏推进，从业务理解到长期演进。
            <br />
            每个阶段，都有明确的目标和交付物。
          </p>
        </div>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {deliverySteps.map((step, i) => (
            <li
              key={step.title}
              className="border-t border-inverse-muted/30 pt-6"
            >
              <span className="font-mono text-sm text-inverse-muted">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-inverse-muted">
                {step.text}
              </p>
              <p className="mt-7 text-xs text-inverse-foreground">
                {step.result}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
