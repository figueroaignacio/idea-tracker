import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';

type ProvidersProps = React.PropsWithChildren & {};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Theme>{children}</Theme>
    </ThemeProvider>
  );
}
