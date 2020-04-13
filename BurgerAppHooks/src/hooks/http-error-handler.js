import { useState, useEffect } from 'react';

const useHttpErrorHandler = (axios) => {
    const [error, setError] = useState(null);

    const reqInter = axios.interceptors.request.use(req => {
        setError(null);
        return req;
    }, err => {
        setError(err);
    });

    const resInter = axios.interceptors.response.use(res => res, err => {
        setError(err);
    });

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(reqInter);
            axios.interceptors.response.eject(resInter);
        }
    }, [axios.interceptors.request, axios.interceptors.response, reqInter, resInter]);

    const hideError = () => {
        setError(null);
    }

    return {
        error: error,
        hideError: hideError
    }
};

export default useHttpErrorHandler;