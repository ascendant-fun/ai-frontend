type BackButtonProps = {
  onClickHandler: () => void;
};

function BackButton({ onClickHandler }: BackButtonProps) {
  return (
    <button
      className="rounded-3xl border transition-all border-white py-2 px-4 flex text-xs leading-[14.5px] md:text-[17px] md:leading-[20px] font-bold bg-[#161515]/10 backdrop-blur-lg md:py-3 md:px-6 hover:bg-[#161515]/30"
      onClick={onClickHandler}
    >
      <svg
        className="my-auto mr-2"
        width="18"
        height="6"
        viewBox="0 0 18 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.194723 2.31036C0.0597859 2.4453 0.0597858 2.66407 0.194723 2.79901L2.39365 4.99794C2.52859 5.13288 2.74737 5.13288 2.8823 4.99794C3.01724 4.863 3.01724 4.64423 2.8823 4.50929L0.9277 2.55469L2.8823 0.600082C3.01724 0.465145 3.01724 0.246369 2.8823 0.111431C2.74737 -0.0235061 2.52859 -0.0235061 2.39365 0.111431L0.194723 2.31036ZM17.0244 2.20916L0.439049 2.20916L0.439049 2.90021L17.0244 2.90022L17.0244 2.20916Z"
          fill="white"
        />
      </svg>
      Back
    </button>
  );
}

export default BackButton;
