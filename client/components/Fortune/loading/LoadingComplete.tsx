import { event } from "nextjs-google-analytics";

type LoadingCompleteProps = {
  onClickHandler: () => void;
};

function LoadingComplete({ onClickHandler }: LoadingCompleteProps) {
  return (
    <div className="relative z-20 mt-8 md:mt-12 mx-auto">
      <div className="text-center text-[26px] leading-[27px] md:text-[40px] md:leading-[42px]">
        <p>Unlock your</p>
        <p className="border-b border-b-white">Ascendant Fortune</p>
        <p>and discover your</p>
        <p>2023 with us</p>
      </div>
      <div className="mt-8 md:mt-24 flex">
        <button
          className="flex transition-all mx-auto space-x-3 bg-secondary hover:bg-secondary/80 text-black font-bold px-6 py-4 md:px-7 text-[16px] leading-[19px] md:text-[20px] md:leading-[24px] md:py-6 rounded-[5px]"
          onClick={() => {
            event("take_me_to_report_clicked" + name, {
              category: "FortuneReport",
              label: "take me to report button clicked",
            });

            onClickHandler();
          }}
        >
          <span className="my-auto">Take Me To Report</span>
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.25"
              y="0.25"
              width="25.5"
              height="25.5"
              rx="12.75"
              fill="#161515"
            />
            <path
              d="M18.7931 12.5058L14.9352 8.55183C14.6696 8.2796 14.2395 8.2796 13.9866 8.55183C13.7209 8.82406 13.7209 9.26485 13.9866 9.52413L16.706 12.3114H7.64953C7.28271 12.3114 6.97913 12.6225 6.97913 12.9985C6.97913 13.3745 7.28271 13.6856 7.64953 13.6856H16.6934L13.9866 16.4729C13.7209 16.7451 13.7209 17.1859 13.9866 17.4452C14.113 17.5748 14.2901 17.6526 14.4672 17.6526C14.6443 17.6526 14.8087 17.5878 14.9479 17.4452L18.8184 13.4782C18.9449 13.3485 19.0208 13.167 19.0208 12.9855C18.9955 12.817 18.9196 12.6355 18.7931 12.5058Z"
              fill="#15FEF0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default LoadingComplete;
