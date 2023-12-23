import Script from 'next/script'

export function AnalyticsScript() {
  const includeAnalyticsScript = process.env.INCLUDE_ANALYTICS_SCRIPT === 'true' || false

  if (!includeAnalyticsScript) {
    return null
  }

  return (
    <>
      {/*<Script src="https://umami.mnsn.pro/script.js" data-website-id="e8159e7b-eb86-431c-bac5-dc9f1deefd59" />*/}
      <Script src="https://eu.umami.is/script.js" data-website-id="d25e451b-c4b0-4c02-a493-5f5a13c1c1c6" />
    </>
  )
}
