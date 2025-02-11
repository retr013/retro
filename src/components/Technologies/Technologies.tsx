import type { ReactNode } from "react";

// Custom Card Component
interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card = ({ children, className }: CardProps) => (
    <div className={`rounded-lg text-white border bg-card text-card-foreground shadow-sm ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children }: { children: ReactNode }) => (
    <div className="flex text-white flex-col space-y-1.5 p-6 text-#f8fafc">{children}</div>
);

const CardTitle = ({ children }: { children: ReactNode }) => (
    <h3 className="text-2xl text-white-700 color-white font-semibold leading-none tracking-tight">{children}</h3>
);

const CardContent = ({ children }: { children: ReactNode }) => (
    <div className="p-6 pt-0">{children}</div>
);

const CardDescription = ({ children }: { children: ReactNode }) => (
    <p className="text-sm text-muted-foreground">{children}</p>
);

// Custom Badge Component
interface BadgeProps {
    children: ReactNode;
    variant?: "default" | "secondary";
}

const Badge = ({ children, variant = "default" }: BadgeProps) => (
    <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
            variant === "secondary"
                ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
        }`}
    >
    {children}
  </span>
);

const ReactIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-4v-2h2v2h-2zm0-4V7h2v5h-2z" />
    </svg>
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm1-12v2h2v2h-2v4h-2v-4H9v-2h2V8h2z" />
    </svg>
);

const TailwindIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-4v-2h2v2h-2zm0-4V7h2v5h-2z" />
    </svg>
);

const ReduxIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-4v-2h2v2h-2zm0-4V7h2v5h-2z" />
    </svg>
);

const WebSocketIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-4v-2h2v2h-2zm0-4V7h2v5h-2z" />
    </svg>
);

const GitIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-4v-2h2v2h-2zm0-4V7h2v5h-2z" />
    </svg>
);

const NpmIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-4v-2h2v2h-2zm0-4V7h2v5h-2z" />
    </svg>
);

const ReactHookFormIcon = () => (
    <svg className="h-8 w-8 text-[#EC5990]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-4v-2h2v2h-2zm0-4V7h2v5h-2z" />
    </svg>
);

const RestApiIcon = () => (
    <svg className="h-8 w-8 text-[#4A90E2]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-4v-2h2v2h-2zm0-4V7h2v5h-2z" />
    </svg>
);

const ZodIcon = () => (
    <svg className="h-8 w-8 text-[#306BAC]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-4v-2h2v2h-2zm0-4V7h2v5h-2z" />
    </svg>
);

// TechnologyCard Component
interface TechnologyCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    tags: string[];
}

const TechnologyCard = ({ title, description, icon, tags }: TechnologyCardProps) => (
    <Card className="h-full">
        <CardHeader>
            <div className="flex items-center space-x-4">
                {icon}
                <CardTitle>{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <CardDescription>{description}</CardDescription>
            <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                    </Badge>
                ))}
            </div>
        </CardContent>
    </Card>
);

// Technologies Data
const technologies = [
    {
        title: "React",
        description: "A JavaScript library for building user interfaces with reusable components.",
        icon: <ReactIcon className="h-8 w-8 text-[#61DAFB]" />,
        tags: ["UI", "Components", "Virtual DOM"],
    },
    {
        title: "TypeScript",
        description:
            "A typed superset of JavaScript that compiles to plain JavaScript, adding optional types, classes, and modules.",
        icon: <TypeScriptIcon className="h-8 w-8 text-[#3178C6]" />,
        tags: ["Static Typing", "ECMAScript", "Tooling"],
    },
    {
        title: "Tailwind CSS",
        description: "A utility-first CSS framework for rapidly building custom user interfaces.",
        icon: <TailwindIcon className="h-8 w-8 text-[#06B6D4]" />,
        tags: ["Utility-first", "Responsive", "Customizable"],
    },
    {
        title: "Redux Toolkit",
        description: "The official, opinionated, batteries-included toolset for efficient Redux development.",
        icon: <ReduxIcon className="h-8 w-8 text-[#764ABC]" />,
        tags: ["State Management", "Immutability", "Middleware"],
    },
    {
        title: "WebSocket",
        description: "A protocol providing full-duplex communication channels over a single TCP connection.",
        icon: <WebSocketIcon className="h-8 w-8 text-[#4353FF]" />,
        tags: ["Real-time", "Bi-directional", "Low-latency"],
    },
    {
        title: "Git",
        description:
            "A distributed version control system for tracking changes in source code during software development.",
        icon: <GitIcon className="h-8 w-8 text-[#F05032]" />,
        tags: ["Version Control", "Branching", "Collaboration"],
    },
    {
        title: "npm",
        description: "A package manager for JavaScript, included with Node.js. It makes it easy to share and reuse code.",
        icon: <NpmIcon className="h-8 w-8 text-[#CB3837]" />,
        tags: ["Package Management", "Dependency", "Scripts"],
    },
    {
        title: "React Hook Form",
        description:
            "A performant, flexible, and extensible form library for React with easy-to-use validation and error handling.",
        icon: <ReactHookFormIcon />,
        tags: ["Forms", "Validation", "Performance"],
    },
    {
        title: "REST API",
        description:
            "A standard architectural style for designing networked applications, enabling communication between client and server.",
        icon: <RestApiIcon />,
        tags: ["HTTP", "Endpoints", "CRUD"],
    },
    {
        title: "Zod",
        description:
            "A TypeScript-first schema validation library with static type inference, ensuring type safety at runtime.",
        icon: <ZodIcon />,
        tags: ["Validation", "Type Safety", "Schemas"],
    },
];

// TechnologiesPage Component
export function TechnologiesPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl pt-10 font-bold mb-8 text-center">Technologies Used</h1>
            <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
                My application leverages a modern tech stack to deliver a robust, efficient, and user-friendly experience.
                Here's an overview of the key technologies that power our platform:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technologies.map((tech) => (
                    <TechnologyCard key={tech.title} {...tech} />
                ))}
            </div>
        </div>
    );
}