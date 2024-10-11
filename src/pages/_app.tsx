// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Simplify Social Media Management`}</title>
        <meta
          name='description'
          content='LinktoSync helps users seamlessly manage, schedule, and post content to multiple social media platforms from a single dashboard.'
        />
        <meta
          name='keywords'
          content='LinktoSync, social media management, post scheduler, social media dashboard, social media analytics, manage multiple social media accounts, social media content planner, social media tool'
        />
        <meta name='robots' content='index, follow' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta property='og:title' content='LinktoSync - Simplify Social Media Management' />
        <meta
          property='og:description'
          content='Streamline your social media posting and manage all your accounts in one place with LinktoSync. Get detailed analytics and schedule posts effortlessly.'
        />
        <meta property='og:url' content='https://linktosync.com/' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='https://linktosync.com/' />
        <meta property='og:site_name' content='LinktoSync' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='LinktoSync - Simplify Social Media Management' />
        <meta
          name='twitter:description'
          content='Manage all your social media accounts in one place, schedule posts, and get analytics with LinktoSync.'
        />
        <meta name='twitter:image' content='https://linktosync.com/' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
