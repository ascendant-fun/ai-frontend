import React, { ReactNode, useEffect, useState } from 'react';

type NoSsrProps = {
    children: ReactNode;
}

const NoSsrYes = ({ children }: NoSsrProps): JSX.Element => {
    const [isMounted, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, []);

    return <>{isMounted ? children : null}</>;
};

export default NoSsrYes;