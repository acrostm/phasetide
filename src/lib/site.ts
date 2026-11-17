export const site = {
  name: "PhaseTide",
  company: "深圳相位潮汐科技有限公司",
  email: "contact@phasetide.com",
  url: "https://www.phasetide.com",
  description:
    "PhaseTide 相位潮汐，为企业提供软件开发、FDE 嵌入式工程、AI 训练与部署解决方案。从业务现场出发，让技术真正落地。",
};
export const navigation = [
  { label: "解决方案", href: "#solutions" },
  { label: "交付方式", href: "#delivery" },
  { label: "关于我们", href: "#about" },
];
export const services = [
  {
    title: "软件开发",
    english: "Software engineering",
    description:
      "从一个想法，到稳定运行的产品。围绕业务目标，设计并构建易用、可靠、可持续迭代的软件。",
    items: ["Web 应用与企业系统", "API 开发与系统集成", "架构设计与工程优化"],
  },
  {
    title: "FDE 嵌入式工程",
    english: "Forward deployed engineering",
    description:
      "让工程师走进业务现场。与您的团队并肩协作，把复杂需求转化为可验证的方案与可交付的成果。",
    items: ["业务梳理与技术验证", "嵌入式协作与快速迭代", "知识转移与团队赋能"],
  },
  {
    title: "AI 训练与部署",
    english: "Applied AI & infrastructure",
    description:
      "连接模型能力与真实场景。从数据准备、模型微调到推理部署，让 AI 成为业务中可用的一环。",
    items: ["数据处理与模型微调", "RAG 知识库与智能体", "私有化部署与推理优化"],
  },
] as const;
export const serviceOptions = [
  "软件开发",
  "FDE 嵌入式工程",
  "AI 训练与部署",
  "综合方案 / 尚在探索",
] as const;
export const deliverySteps = [
  {
    title: "理解业务",
    text: "深入业务场景，明确目标、约束与成功标准。",
    result: "需求共识与实施范围",
  },
  {
    title: "验证方案",
    text: "用原型与技术验证，尽早识别关键假设。",
    result: "可验证的技术路径",
  },
  {
    title: "构建交付",
    text: "分阶段开发与验收，让每一次迭代都可见。",
    result: "可运行的产品与文档",
  },
  {
    title: "持续演进",
    text: "结合真实反馈，优化性能、体验与业务适配。",
    result: "持续迭代与知识交接",
  },
];
