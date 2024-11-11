import { Chip } from '@nextui-org/chip';
import { GithubIcon, ArxivIcon } from './icons';


type BadgeProps = {
    link: string;
    icon: React.ReactNode;
    label: string;
};

export function Badge({ link, icon, label }: BadgeProps) {
    return (
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
    );
}

export function GithubBadge({ link }: { link: string }) {
    return <Badge link={link} icon={<GithubIcon />} label="GitHub" />;
}

export function ArxivBadge({ link }: { link: string }) {
    return <Badge link={link} icon={<ArxivIcon />} label="arXiv" />;
}
