import Script from 'next/script'

export function AnalyticsScript() {
  const includeAnalyticsScript = process.env.INCLUDE_ANALYTICS_SCRIPT === 'true' || false

  if (!includeAnalyticsScript) {
    return null
  }

  return (
    <>
      <Script data-domain="italianverbs.info" src="https://analytics.mnsn.pro/js/script.js" />

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-X148B71F9D" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-X148B71F9D');
        `}
      </Script>
    </>
  )
}
