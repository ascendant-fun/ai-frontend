import { socialMediaReturnType, validSocialMedias } from "../../hooks/useSocialMedia";
import DiscordIcon from "../Base/icons/DiscordIcon";
import FacebookIcon from "../Base/icons/FacebookIcon";
import MediumIcon from "../Base/icons/MediumIcon";
import TelegramIcon from "../Base/icons/TelegramIcon";
import TwitterIcon from "../Base/icons/TwitterIcon";
import { event } from "nextjs-google-analytics";

interface SocialButtonProps extends socialMediaReturnType {
    showLabel?: boolean;
}

function getBackgroundColorClasses(name: validSocialMedias) {
    if (name === 'facebook') return 'group-hover:bg-[#3874E9]';
    if (name === 'discord') return 'group-hover:bg-[#5762E3]';
    if (name === 'telegram') return 'group-hover:bg-[#66B7F1]';
    if (name === 'twitter') return 'group-hover:bg-[#4B99E9]';

    return 'group-hover:bg-white/40';
}


function SocialButton({ name, text, href, showLabel = false }: SocialButtonProps) {
    const bgClasses = getBackgroundColorClasses(name);

    return (
        <a
            href={href}
            className={`transition-all group flex`}
            target="_blank"
            rel="noreferrer"
            aria-label={text}
            onClick={() => {
                event("social_button_clicked_" + name, {
                    category: "FortuneReport",
                    label: 'about us button clicked',
                });
            }}
        >
            <div className={`w-[34px] h-[34px] flex justify-center items-center align-middle px-2 rounded-full bg-white shadow-xl shadow-black/17 ${bgClasses}`}>
                {
                    name === 'facebook' && (
                        <FacebookIcon extraClasses="fill-black group-hover:fill-white transition-all" />
                    )
                }
                {
                    name === 'discord' && (
                        <DiscordIcon extraClasses="fill-black group-hover:fill-white transition-all" />
                    )
                }
                {
                    name === 'twitter' && (
                        <TwitterIcon extraClasses="fill-black group-hover:fill-white transition-all" />
                    )
                }
                {
                    name === 'telegram' && (
                        <TelegramIcon extraClasses="fill-black group-hover:fill-white transition-all" />
                    )
                }
                {
                    name === 'medium' && (
                        <MediumIcon extraClasses="fill-black group-hover:fill-white transition-all" />
                    )
                }
            </div>
            {
                showLabel && (
                    <label className="my-auto ml-4 capitalize font-bold text-[15px] group-hover:text-white/70 cursor-pointer">{name}</label>
                )
            }
        </a>
    );
}

export default SocialButton;