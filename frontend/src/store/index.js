import { configureStore } from '@reduxjs/toolkit'
import directorySlice from './slices/directorySlice'
import counterReducer from './slices/counterSlice'
import noteSlice from './slices/noteSlice'
import projectsSlice from './slices/projectsSlice'
import eventsSlice from './slices/eventsSlice'
import searchSlice from './slices/searchSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    note: noteSlice,
    projects: projectsSlice,
    directory:directorySlice,
    events:eventsSlice,
    search:searchSlice
  }
})