import { MutableRefObject, useLayoutEffect } from "react";

type Target = MutableRefObject<HTMLElement | null>
const store: Record<string, Target[]> = {};

const resize = () => {
    let height = 0;
    store["key1"].map((element) => {
        if(element.current) {
            height = height + element.current.clientHeight;
        }
    })
    let element2 = store["key2"].at(0);
    if (element2?.current) {
        element2.current.style.maxHeight = `${height}px`;
    }
}

const add = (key: string, value: Target) => {
    if (!store[key]) {
        store[key] = []
    }
    store[key].push(value);

    return () => {
        const index = store[key].indexOf(value);
        if (index > -1) {
            store[key].splice(index, 1);
        }
    }
}

export type UseElementHeightEqualizerProps = Array<[string, Target]>;

export const useElementHeightEqualizer = (refs: UseElementHeightEqualizerProps, dependencies?:[]) => {
    useLayoutEffect(() => {
        const cleanups: (() => void)[] = [];
        refs.map(([key, element]) => {
            const cleanup = add(key, element);
            cleanups.push(cleanup);
            return;
        }) 
        return () => {
            cleanups.map(cleanup => {
                cleanup()
            })
        }
    })
    useLayoutEffect(() => {
        resize();
    }, dependencies)
}