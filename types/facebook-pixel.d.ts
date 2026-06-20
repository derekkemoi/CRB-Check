export const pageview = () => {
  window.fbq?.("track", "PageView")
}

export const track = (
  event: string,
  options?: Record<string, unknown>
) => {
  window.fbq?.("track", event, options)
}