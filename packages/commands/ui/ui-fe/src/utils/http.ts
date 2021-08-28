/* eslint-disable @typescript-eslint/no-unused-vars */
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string;
    data?: Record<string, unknown>;
}

export const http = async (
    endpoint: string,
    { data, token, headers, ...customConfig }: Config = {}
) => {
    const config = {
        method: "GET",
        headers: {
            "Content-Type": data ? "application/json" : "",
        },
        ...customConfig,
    };

    if (config.method.toUpperCase() === "GET") {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }

    // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
    return window
        .fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                const { data: res, errno } = data;
                if (errno === 0) {
                    return res;
                } else {
                    return Promise.reject(data);
                }
            } else {
                return Promise.reject(data);
            }
        });
};
