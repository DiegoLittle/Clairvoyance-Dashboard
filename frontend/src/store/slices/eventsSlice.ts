import { createSlice } from '@reduxjs/toolkit'

export const eventsSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
      setEvents: (state,action)=>{
          state = action.payload
          return state
      },
      addEvent: (state,action)=>{

        let stateProxy = state
        stateProxy.push(action.payload)
        state = stateProxy
        return state
      }
  }
})

// Action creators are generated for each case reducer function
export const { setEvents,addEvent} = eventsSlice.actions

export default eventsSlice.reducer