import { useEffect } from "react";

export default function useInfiniteScroll(props) {
  useEffect(()=>{
    const sentinelRef = props.sentinelRef;
    const onLoadMore = props.onLoadMore;
    const canLoad = props.canLoad;
    if (!canLoad || !sentinelRef || !sentinelRef.current) {
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting){
          onLoadMore();
        }
      });
    });
    observer.observe(sentinelRef.current);
    return function () {
      observer.disconnect();
    };
  }, [props.sentinelRef, props.onLoadMore, props.canLoad]);
}
