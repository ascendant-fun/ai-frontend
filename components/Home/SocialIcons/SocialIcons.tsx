import SocialIcon from "./SocialIcon";

const socialIcons = [
    {
        name: 'Music',
        icon: '/images/social/music.svg',
        url: '#',
        width: 26.58,
        height: 30,
    },
    {
        name: 'Twitter',
        icon: '/images/social/twitter.svg',
        url: 'https://twitter.com/',
        width: 28,
        height: 20.93
    },
    {
        name: 'Discord',
        icon: '/images/social/discord.svg',
        url: 'https://discord.com/',
        width: 28,
        height: 28
    },
];

function SocialIcons() {
    return (
        <div className="flex space-x-2">
            {
                socialIcons.map(socialIcon => (
                    <SocialIcon
                        key={socialIcon.name}
                        name={socialIcon.name}
                        icon={socialIcon.icon}
                        url={socialIcon.url}
                        width={socialIcon.width}
                        height={socialIcon.height}
                    />
                ))
            }
        </div>
    );
}

export default SocialIcons;