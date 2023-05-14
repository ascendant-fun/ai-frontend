interface ActionButtonParams {
  title: string;
  onClickHandler?: () => void;
}

function ActionButton({ title, onClickHandler }: ActionButtonParams) {
  return (
    <>
      <button
        onClick={onClickHandler}
        className="group font-raleway font-semibold"
      >
        <svg
          width="206"
          height="44"
          viewBox="0 0 206 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M132 0H88H44H22L13.2 13.2L0 22L13.2 30.8L22 44H44H88H132H183.7L192.5 30.8L205.7 22L192.5 13.2L183.7 0H132Z"
            className="fill-primary transition group-hover:fill-primary/80"
          />
          <text
            x="100"
            y="23"
            className="fill-black"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {title}
          </text>
        </svg>
      </button>
    </>
  );
}

export default ActionButton;
