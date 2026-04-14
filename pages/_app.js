import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import NavbarComponent from "@/components/NavbarComponent";
import ErrorBoundary from "@/components/ErrorBoundary";

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <NavbarComponent />
      <main>
        <Component {...pageProps} />
      </main>
    </ErrorBoundary>
  );
}
export default MyApp;
