import Image from 'next/image'

interface SocialIconProps {
    name: string;
    icon: string;
    url: string;
    width?: number;
    height?: number;
}

function SocialIcon({ name, icon, url, width = 28, height = 28 }: SocialIconProps) {
    return (
        <a className="rounded-full bg-primary p-4 hover:bg-primary/80 transition transform hover:scale-105" href={url} target="_blank" rel="noreferrer">
            <Image src={icon} width={width} height={height} alt={name} />
        </a>
    );
}

export default SocialIcon;