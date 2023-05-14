function LoadingHeader() {
    return (
        <div className="absolute grid h-14 bg-black/[50%] md:grid-flow-col md:grid-col-2 justify-items-center md:justify-items-start px-4 py-3 z-50 top-0 w-full border-b md:border md:w-[97%] md:mt-4 md:left-1/2 md:-translate-x-1/2 md:inset-x-0 transform border-white/25 rounded-t-0 rounded-b-[10px] md:rounded-[10px] md:py-0 md:h-[78px] md:bg-black/25 md:backdrop-blur-sm">
            <div className="grid md:mx-auto justify-items-center align-middle md:my-6">
                <img
                    className="w-44 md:w-60 h-auto my-auto"
                    src={'/assets/logo.svg'} alt="logo"
                />
            </div>
        </div>
    );
}

export default LoadingHeader;