import './App.css'
/* Material UI */
import spbeMalKotTheme from './Themes'
import { ThemeProvider } from '@mui/material'
/* React Router DOM */
import { RouterProvider } from 'react-router-dom'
import AppRouter from './routes'

function App() {

  return (
    <>
      <ThemeProvider theme={spbeMalKotTheme}>
        <RouterProvider router={AppRouter} />
      </ThemeProvider>
    </>
  )
}

export default App
