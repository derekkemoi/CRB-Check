export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID!

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

export const pageview = () => {
  window.fbq?.("track", "PageView")
}

export const track = (
  event: string,
  options?: Record<string, unknown>
) => {
  window.fbq?.("track", event, options)
}