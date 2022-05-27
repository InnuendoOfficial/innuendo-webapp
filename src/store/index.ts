// index.ts
/**
 * Configuration for vue store.
 */

import { createStore } from 'vuex'
import user from './modules/user'

const store = createStore({
    modules: {
        user,
    }
})

export default store