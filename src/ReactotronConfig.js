/** @format */

import Reactotron from 'reactotron-react-js'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'

console.disableYellowBox = true

Reactotron.configure({name: 'MStore' })

Reactotron.use(reduxPlugin())

console.tron = Reactotron
