import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useFetcher } from '@remix-run/react';

enum Theme {
    PALYANITSA = 'palyanitsa',
    RETRO = 'retro'
}

const themes: Array<Theme> = Object.values(Theme);

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
ThemeContext.displayName = 'ThemeContext';

const prefersLightMQ = '(prefers-color-scheme: light)';
const getPreferredTheme = () =>
    window.matchMedia(prefersLightMQ).matches ? Theme.RETRO : Theme.PALYANITSA;

function ThemeProvider({
    children,
    specifiedTheme
}: {
    children: ReactNode;
    specifiedTheme: Theme | null;
}) {
    const [theme, setTheme] = useState<Theme | null>(() => {
        // On the server, if we don't have a specified theme then we should
        // return null and the clientThemeCode will set the theme for us
        // before hydration. Then (during hydration), this code will get the same
        // value that clientThemeCode got so hydration is happy.
        if (specifiedTheme) {
            if (themes.includes(specifiedTheme)) return specifiedTheme;
            else return null;
        }

        // there's no way for us to know what the theme should be in this context
        // the client will have to figure it out before hydration.
        if (typeof window !== 'object') return null;

        return getPreferredTheme();
    });

    const persistTheme = useFetcher();
    // TODO: remove this when persistTheme is memoized properly
    const persistThemeRef = useRef(persistTheme);

    useEffect(() => {
        persistThemeRef.current = persistTheme;
    }, [persistTheme]);

    const mountRun = useRef(false);

    useEffect(() => {
        if (!mountRun.current) {
            mountRun.current = true;
            return;
        }
        if (!theme) return;

        persistThemeRef.current.submit(
            { theme },
            { action: 'action/set-theme', method: 'post' }
        );
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(prefersLightMQ);
        const handleChange = () => {
            setTheme(mediaQuery.matches ? Theme.RETRO : Theme.PALYANITSA);
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}

const clientThemeCode = `
// hi there dear reader 👋
// this is how I make certain we avoid a flash of the wrong theme. If you select
// a theme, then I'll know what you want in the future and you'll not see this
// script anymore.
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersLightMQ)}).matches
    ? 'retro'
    : 'palyanitsa';

  const cl = document.documentElement.classList;

  const themeAlreadyApplied = cl.contains('retro') || cl.contains('palyanitsa');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "Hi there, could you let me know you're seeing this message? Thanks!",
    );
  } else {
    cl.add(theme);
  }

  // the <dark-mode> and <light-mode> approach won't work for meta tags,
  // so we have to do it manually.
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'palyanitsa') {
      meta.content = 'palyanitsa light';
    } else if (theme === 'light') {
      meta.content = 'light palyanitsa';
    }
  } else {
    console.warn(
      "Heya, could you let me know you're seeing this message? Thanks!",
    );
  }
})();
`;

function NonFlashOfWrongThemeEls({ ssrTheme }: { ssrTheme: boolean }) {
    const [theme] = useTheme();
    return (
        <>
            {/*
          On the server, "theme" might be `null`, so clientThemeCode ensures that
          this is correct before hydration.
        */}
            <meta
                name="color-scheme"
                content={
                    theme === 'retro' ? 'palyanitsa light' : 'light palyanitsa'
                }
            />
            {/*
          If we know what the theme is from the server then we don't need
          to do fancy tricks prior to hydration to make things match.
        */}
            {ssrTheme ? null : (
                <script
                    // NOTE: we cannot use type="module" because that automatically makes
                    // the script "defer". That doesn't work for us because we need
                    // this script to run synchronously before the rest of the document
                    // is finished loading.
                    dangerouslySetInnerHTML={{ __html: clientThemeCode }}
                />
            )}
        </>
    );
}

function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

function isTheme(value: unknown): value is Theme {
    return typeof value === 'string' && themes.includes(value as Theme);
}

export { isTheme, Theme, ThemeProvider, useTheme, NonFlashOfWrongThemeEls };
