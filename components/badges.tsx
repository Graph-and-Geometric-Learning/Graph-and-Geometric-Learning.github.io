import { Chip } from "@heroui/chip";
import { GithubIcon, ArxivIcon, PaperIcon } from './icons';


type BadgeProps = {
    link: string;
    icon: React.ReactNode;
    label: string;
};

export function Badge({ link, icon, label }: BadgeProps) {
    return (
        <div className='items-center'>
        <a href={link}>
            <Chip
                startContent={icon}
                color="default"
                radius="md"
                size="lg"
                className="hover:shadow-lg"
            >
                {label}
            </Chip>
        </a>
        </div>
    );
}

export function GithubBadge({ link }: { link: string }) {
    return <Badge link={link} icon={<GithubIcon />} label="GitHub" />;
}

export function ArxivBadge({ link }: { link: string }) {
    return <Badge link={link} icon={<ArxivIcon />} label="ArXiv" />;
}

export function PdfBadge({ link }: { link: string }) {
    return <Badge link={link} icon={<PaperIcon />} label="Paper" />;
}

// The VenueBadge component is used to display the venue of a paper.
export function VenueBadge ({ venue }: { venue: string }) {
    return <Badge link="#" icon={null} label={venue} />;
}

import { ReactNode } from 'react';

export const BadgeContainer = ({ children }: { children: ReactNode }) => {
    return (
    <div className="flex flex-wrap gap-2 justify-center">
        {children}
    </div>
    );
}

export function Badges({
    github,
    arxiv,
    pdf,
    venue,
}: {
    venue?: string;
    github?: string;
    arxiv?: string;
    pdf?: string;
}) {
    return (
        <BadgeContainer>
            {venue && <VenueBadge venue={venue} />}
            {github && <GithubBadge link={github} />}
            {arxiv && <ArxivBadge link={arxiv} />}
            {pdf && <PdfBadge link={pdf} />}
        </BadgeContainer>
    );
}