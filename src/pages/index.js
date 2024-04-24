import React from 'react'
import SelectAccount from './auth/select-account' // Corrected import statement
import SignIn from './auth/sign-in' // Corrected import statement
import CabinComponent from './pages/scancabinid' // Corrected import statement

import CabinIdInput from './pages/manualcabinid' // Corrected import statement
const Home = () => {
  return (
    <div>
      {/* {<SignIn/> }   */}
  { <SelectAccount /> }   
      {/* <CabinComponent/> */}
    </div>
  )
}

export default Home
