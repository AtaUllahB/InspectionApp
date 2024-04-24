import React from 'react'

import { HelmetProvider, Helmet } from 'react-helmet-async'
import { CacheProvider } from '@emotion/react'
import { Inter } from 'next/font/google'
import 'chart.js/auto'

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'


import '../vendor/perfect-scrollbar.css'
import '../../src/style/Camera.css';
import '../../src/style/loader.css';

import createTheme from '../theme'
import { ThemeProvider } from '../contexts/ThemeContext'
import useTheme from '../hooks/useTheme'
import createEmotionCache from '../utils/createEmotionCache'
import { CabinProvider } from '../contexts/CabinContext';
import { AuthProvider } from '../contexts/AuthContext'
import { QualityPointsProvider } from '../contexts/QualityPointsContext';
import { CameraProvider } from '../contexts/CameraContext';
import { ActiveTitleProvider } from '../contexts/ActiveTitleContext';
import { DataPostedProvider } from '../contexts/DataPostedContext';
import { InspectionProvider } from '../contexts/InspectionContext';
import { InspectionIdProvider } from '../contexts/InspectionIdContext';
import { TitleManagementProvider } from '../contexts/TitleManagementContext';
// import { AuthProvider } from "../contexts/FirebaseAuthContext";
// import { AuthProvider } from "../contexts/Auth0Context";
// import { AuthProvider } from "../contexts/CognitoContext";

const inter = Inter({ subsets: ['latin'] })

const clientSideEmotionCache = createEmotionCache()

function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  const { theme } = useTheme()

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <CacheProvider value={emotionCache}>
        <HelmetProvider>
          <Helmet titleTemplate="%s | banana.ai" defaultTitle="banana.ai" />
        
              <MuiThemeProvider theme={createTheme(theme)}>
                <AuthProvider>
                  
                  <CabinProvider>
                  <CameraProvider>
                  <QualityPointsProvider>
                  <ActiveTitleProvider> 
                  <DataPostedProvider>
                  <InspectionProvider>
                  <InspectionIdProvider>
                  <TitleManagementProvider>

                  {getLayout(<Component {...pageProps} />)}
                  </TitleManagementProvider>
                  </InspectionIdProvider>
                 </InspectionProvider>
                 </DataPostedProvider>
                 </ActiveTitleProvider>
                  </QualityPointsProvider>
                  </CameraProvider>
                  </CabinProvider>
                  
                </AuthProvider>
              </MuiThemeProvider>

        </HelmetProvider>
      </CacheProvider>
    </>
  )
}

const withThemeProvider = (Component) => {
  const AppWithThemeProvider = (props) => {
    return (
      <ThemeProvider>
        <Component {...props} />
      </ThemeProvider>
    )
  }
  AppWithThemeProvider.displayName = 'AppWithThemeProvider'
  return AppWithThemeProvider
}

export default withThemeProvider(App)
