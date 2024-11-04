import { AppProps } from 'next/app';
import './styles/globals.css'; // Import Tailwind CSS or global styles here
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();  

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <QueryClientProvider client={queryClient}>
  <Component {...pageProps} />
  <ReactQueryDevtools/>
</QueryClientProvider>
  );
}

export default MyApp;
