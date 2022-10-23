function getEnv() {
    return {
        NODE_ENV: process.env.NODE_ENV,
    };
}

type ENV = ReturnType<typeof getEnv>;

// App puts these on
declare global {
    // eslint-disable-next-line
    var ENV: ENV;
    interface Window {
        ENV: ENV;
    }
}

export { getEnv };
