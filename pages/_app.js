import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div id="portal-root"></div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
