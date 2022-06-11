import '../styles/globals.css'
import '../styles/prism.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div id="portal-root"></div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
