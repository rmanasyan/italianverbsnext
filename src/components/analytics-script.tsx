import Script from 'next/script'

export function AnalyticsScript() {
  const includeAnalyticsScript = process.env.INCLUDE_ANALYTICS_SCRIPT === 'true' || false

  if (!includeAnalyticsScript) {
    return null
  }

  return (
    <>
      <Script src="https://umami.mnsn.pro/script.js" data-website-id="e8159e7b-eb86-431c-bac5-dc9f1deefd59" />
    </>
  )
}
