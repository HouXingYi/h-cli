import { useEffect, useRef } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
    value === undefined || value === null || value === "";

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
    const oldTitle = useRef(document.title).current;
    // 页面加载时: 旧title
    // 加载后：新title

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                // 如果不指定依赖，读到的就是旧title
                document.title = oldTitle;
            }
        };
    }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
    O extends { [key in string]: unknown },
    K extends keyof O
>(
    obj: O,
    keys: K[]
) => {
    const filteredEntries = Object.entries(obj).filter(([key]) =>
        keys.includes(key as K)
    );
    return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    });
    return mountedRef;
};
