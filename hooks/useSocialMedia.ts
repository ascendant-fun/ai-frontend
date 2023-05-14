export type validSocialMedias =
  | "facebook"
  | "twitter"
  | "discord"
  | "telegram"
  | "medium";
export interface socialMediaReturnType {
  name: validSocialMedias;
  text: string;
  href: string;
}

function useSocialMedia(uniqueID: string): socialMediaReturnType[] {
  // get current full URL
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const fullURL = `${origin}`;
  const sharingUrl = `${fullURL}/fortune/${uniqueID}`;
  const sharingText = `Generate your Ascendant Fortune Report and discover your 2023 with me! #2023ASCFortune.`;

  const telegramSharingText =
    "Generate your Ascendant Fortune Report and discover your 2023 with me!";
  const twitterUrl = new URL("https://twitter.com/intent/tweet");
  twitterUrl.searchParams.set(
    "text",
    `${sharingText} Get lucky with @Ascendant_astro. ${sharingUrl}`
  );

  const facebookUrl = new URL("https://www.facebook.com/sharer/sharer.php");
  facebookUrl.searchParams.set("u", sharingUrl);

  const telegramUrl = new URL("https://t.me/share/url");
  telegramUrl.searchParams.set("url", `${sharingUrl}`);
  telegramUrl.searchParams.set("text", telegramSharingText);

  const socialMedias: socialMediaReturnType[] = [
    {
      name: "twitter",
      text: "Share to Twitter",
      href: twitterUrl.href,
    },
    {
      name: "discord",
      text: "Share to Discord",
      href: "https://discord.com/app",
    },
    {
      name: "telegram",
      text: "Share to Telegram",
      href: telegramUrl.href,
    },
    {
      name: "facebook",
      text: "Share to Facebook",
      href: facebookUrl.href,
    },
  ];

  return socialMedias;
}

export { useSocialMedia };
