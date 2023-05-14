/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, forwardRef } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useMedia } from "react-use";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import ReportHeader from "../base/ReportHeader";
import ReportFooter from "../base/ReportFooter";
import { Account, FriendCard, UserReport } from "../../../../types/ApiClient";
import FriendCardWrapper from "../../Base/FriendCard";
import RightArrow from "../../Base/icons/RightArrow";

interface LuckyFriendsProps {
  nickName: string;
  userReport: UserReport;
  friendCards: FriendCard[];
}

function SlidePrevButton() {
  const swiper = useSwiper();

  return (
    <button
      className="absolute hidden md:block z-20 w-[35px] h-[42px] top-1/2 -translate-y-1/2 -left-60 rounded-tr-full rounded-br-full bg-white p-2 shadow-xl"
      onClick={() => swiper.slidePrev()}
    >
      <RightArrow width={15} height={10} extraClasses="rotate-180 fill-black" />
    </button>
  );
}

function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button
      className="absolute hidden md:block z-20 w-[35px] h-[42px] top-1/2 -translate-y-1/2 right-0 rounded-tl-full rounded-bl-full bg-white p-2 shadow-xl"
      onClick={() => swiper.slideNext()}
    >
      <RightArrow width={15} height={10} extraClasses="fill-black" />
    </button>
  );
}

const LuckyFriends = forwardRef<HTMLDivElement, LuckyFriendsProps>(
  ({ nickName, userReport, friendCards }, ref) => {
    const isMobile = useMedia("(max-width: 768px)");
    const [account, setAccount] = useState<Account>({
      id: 0,
      code: "",
      ens: "",
      nickName: "",
      publicAddress: "",
    });

    useEffect(() => {
      if (friendCards.length) {
        setAccount(friendCards[0].account);
      }
    }, [friendCards]);

    return (
      <div
        className={`h-full min-h-screen bg-no-repeat bg-cover bg-[url('/images/report/lucky-friends-mobile-bg.jpg')] md:h-auto md:min-h-0 md:bg-none`}
      >
        <div
          className="h-[675px] md:h-[1000px] lg:h-[900px] bg-center md:bg-left flex flex-col overflow-hidden w-screen pb-4 max-w-[1130px] md:rounded-xl relative bg-no-repeat bg-cover bg-[url('/images/report/lucky-goodies-mobile-bg.jpg')] md:bg-[url('/images/report/lucky-friends-bg.jpg')] md:scale-[85%] md:-translate-y-20 md:-mb-32 lg:scale-[70%] lg:-translate-y-32 lg:-mb-56 xl:scale-[70%] xl:-translate-y-32 xl:-mb-56 2xl:scale-[85%] 2xl:-translate-y-14 2xl:-mb-20 3xl:scale-[100%] 3xl:translate-y-0 3xl:mb-0"
          ref={ref}
        >
          <img
            src="/images/report/lucky-friends-illustrations.png"
            className="hidden md:block absolute top-[138px] left-[60px]"
            alt="illustration"
          />
          <img
            src="/images/report/lucky-friends-mobile-illustrations.png"
            className="block md:hidden absolute top-[80px] left-2"
            alt="illustration"
          />
          <ReportHeader
            nickName={nickName}
            address={userReport.publicAddress}
            ens={userReport.account.ens}
          />
          <div className="md:mx-0 mt-[108px] pb-4 md:pb-20 md:mt-36 flex flex-col">
            <h1 className="font-michroma mt-0 md:mt-4 px-2 text-center text-primary text-[22px] leading-[32px] md:text-[60px] md:leading-[72px] md:mx-5 lg:mx-10">
              Ascendant Fortune Card
            </h1>
            <h2 className="mt-1 md:mt-2 text-center text-[18px] md:text-3xl">
              2023 fortunes in a nutshell
            </h2>
            <div className="relative mt-3 ml-0 md:ml-60 md:mt-10 rounded-xl">
              <Swiper
                spaceBetween={isMobile ? 12 : 40}
                slidesPerView="auto"
                centeredSlides={isMobile ? true : false}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="friendsSwiper px-6"
              >
                <SlidePrevButton />
                {friendCards.map((item, index) => (
                  <SwiperSlide
                    key={`${index}`}
                    style={{ width: "326px", minWidth: "326px" }}
                  >
                    <FriendCardWrapper
                      isCurrentUser={index === 0}
                      account={item.account}
                      highlight={item.highlight}
                      report={item.report}
                      nickname={nickName}
                      showForYou
                      showUpload
                      onAccountChange={setAccount}
                    />
                  </SwiperSlide>
                ))}
                <SlideNextButton />
              </Swiper>
            </div>
          </div>
          <ReportFooter
            extraClasses="mt-auto"
            referralCode={userReport.account.code}
          />
        </div>
        {friendCards.length && (
          <FriendCardWrapper
            id="report-lucky-friends-preview"
            style={{ width: 326, display: "none" }}
            isCurrentUser={true}
            account={account}
            highlight={friendCards[0].highlight}
            report={friendCards[0].report}
            nickname={nickName}
            showForYou={false}
          />
        )}
      </div>
    );
  }
);

LuckyFriends.displayName = "LuckyFriends";

export default LuckyFriends;
