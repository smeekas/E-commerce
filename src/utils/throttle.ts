export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  duration: number,
) {
  let isExecuted = false;
  return (...args: Parameters<T>) => {
    if (isExecuted) return;
    isExecuted = true;
    setTimeout(() => {
      isExecuted = false;
    }, duration);
    fn(...args);
  };
}
