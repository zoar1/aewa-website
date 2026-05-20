import { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    id?: string;
    noContainer?: boolean;
}

export default function Section({
    children,
    className = "",
    containerClassName = "",
    id,
    noContainer = false,
}: SectionProps) {
    return (
        <section id={id} className={`py-12 md:py-16 lg:py-24 ${className}`}>
            {noContainer ? children : (
                <Container className={containerClassName}>{children}</Container>
            )}
        </section>
    );
}
