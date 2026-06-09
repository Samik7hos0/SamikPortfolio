import { createContext, useContext, useEffect, useState } from 'react'

type Resolved = 'light' | 'dark'
interface ThemeCtx { resolved: Resolved }

const Ctx = createContext<ThemeCtx>({ resolved: 'dark' })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [resolved, setResolved] = useState<Resolved>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolved)
  }, [resolved])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const fn = (e: MediaQueryListEvent) => setResolved(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  return <Ctx.Provider value={{ resolved }}>{children}</Ctx.Provider>
}

export const useTheme = () => useContext(Ctx)
