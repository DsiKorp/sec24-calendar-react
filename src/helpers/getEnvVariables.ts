
export const getEnvVariables = () => {
    // Access environment variables using import.meta.env
    import.meta.env;
    return {
        ...import.meta.env
    };
};
