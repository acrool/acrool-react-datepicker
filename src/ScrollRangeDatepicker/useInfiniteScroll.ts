import {useEffect, useRef, useState, useCallback} from 'react';

type UseInfiniteScrollOptions = {
    loadMoreTop: () => Promise<void>; // 載入頂部更多數據
    loadMoreBottom: () => Promise<void>; // 載入底部更多數據
    hasMoreTop: boolean; // 是否還有更多頂部數據
    hasMoreBottom: boolean; // 是否還有更多底部數據
};

export function useInfiniteScroll({
    loadMoreTop,
    loadMoreBottom,
    hasMoreTop,
    hasMoreBottom,
}: UseInfiniteScrollOptions) {
    const topRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const [isLoadingTop, setIsLoadingTop] = useState(false);
    const [isLoadingBottom, setIsLoadingBottom] = useState(false);

    const handleIntersect = useCallback(
        async (entries: IntersectionObserverEntry[]) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    if (entry.target === topRef.current && hasMoreTop && !isLoadingTop) {
                        setIsLoadingTop(true);
                        await loadMoreTop();
                        setIsLoadingTop(false);
                    } else if (
                        entry.target === bottomRef.current &&
                        hasMoreBottom &&
                        !isLoadingBottom
                    ) {
                        setIsLoadingBottom(true);
                        await loadMoreBottom();
                        setIsLoadingBottom(false);
                    }
                }
            }
        },
        [hasMoreTop, hasMoreBottom, loadMoreTop, loadMoreBottom, isLoadingTop, isLoadingBottom]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });

        if (topRef.current) observer.observe(topRef.current);
        if (bottomRef.current) observer.observe(bottomRef.current);

        return () => {
            if (topRef.current) observer.unobserve(topRef.current);
            if (bottomRef.current) observer.unobserve(bottomRef.current);
        };
    }, [handleIntersect]);

    return {topRef, bottomRef, isLoadingTop, isLoadingBottom};
}
