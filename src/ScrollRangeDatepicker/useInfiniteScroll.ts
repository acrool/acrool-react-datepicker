import {useCallback,useEffect, useRef, useState} from 'react';

type UseInfiniteScrollOptions = {
    loadMoreTop: () => Promise<void>, // 載入頂部更多數據
    loadMoreBottom: () => Promise<void>, // 載入底部更多數據\
};

export function useInfiniteScroll({
    loadMoreTop,
    loadMoreBottom,
}: UseInfiniteScrollOptions) {
    const containerRef = useRef<HTMLDivElement | null>(null); // 內部管理滾動容器
    const topRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const [isLoadingTop, setIsLoadingTop] = useState(false);
    const [isLoadingBottom, setIsLoadingBottom] = useState(false);


    const handleIntersect = useCallback(
        async (entries: IntersectionObserverEntry[]) => {
            const container = containerRef.current;
            if (!container) return;

            for (const entry of entries) {
                if (entry.isIntersecting) {
                    if (entry.target === topRef.current && !isLoadingTop) {
                        // 記錄滾動位置和高度
                        const target = container.querySelector('[data-year-month]');

                        setIsLoadingTop(true);
                        await loadMoreTop();

                        if(target){
                            target.scrollIntoView({behavior: 'auto', block: 'start'});
                        }

                        setIsLoadingTop(false);

                    } else if (
                        entry.target === bottomRef.current &&
                        !isLoadingBottom
                    ) {
                        setIsLoadingBottom(true);
                        await loadMoreBottom();
                        setIsLoadingBottom(false);
                    }
                }
            }
        },
        [loadMoreTop, loadMoreBottom, isLoadingTop, isLoadingBottom]
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

    return {containerRef, topRef, bottomRef, isLoadingTop, isLoadingBottom};
}
