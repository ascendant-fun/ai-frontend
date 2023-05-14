interface ExclamationIconProps {
    classes?: string;
}

function ExclamationIcon({ classes }: ExclamationIconProps) {
    if (classes === undefined || classes.length === 0) {
        classes = 'fill-white w-4 h-4';
    }

    return (
        <svg className={classes} viewBox="0 0 9 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 0.5C2.01 0.5 0 2.51 0 5C0 7.49 2.01 9.5 4.5 9.5C6.99 9.5 9 7.49 9 5C9 2.51 6.99 0.5 4.5 0.5ZM5 7.09C5 7.35998 4.76998 7.58001 4.5 7.58001C4.23002 7.58001 4 7.36003 4 7.09V4.53C4 4.26002 4.23002 4.03999 4.5 4.03999C4.76998 4.03999 5 4.25997 5 4.53V7.09ZM4.50999 3.4C4.24001 3.4 4.01998 3.18002 4.01998 2.90999C4.01998 2.64001 4.23997 2.41998 4.50999 2.41998C4.77997 2.41998 5 2.63997 5 2.90999C5 3.18001 4.78002 3.4 4.50999 3.4Z" />
        </svg>

    );
}

export default ExclamationIcon;