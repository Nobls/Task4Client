import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios/axios";


const initialState = {
    data: null,
    token: null,
    status: null,
    loading: false,
    errors: null,
}

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async ({email, password}) => {
        try {
            const {data} = await axios.post('/auth/login', {
                email,
                password,
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (error) {
            console.log(error)
        }
    })

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async ({email, password, username, position}) => {
        try {
            const {data} = await axios.post('/auth/registration', {
                username,
                password,
                email,
                position,
            })

            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/user')
    return data
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        //Login user
        builder.addCase(fetchLogin.pending, (state) => {
            state.loading = true;
            state.status = null
        })
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.message
            state.data = action.payload
            state.token = action.payload.token
        })
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.status = action.payload
            state.loading = false;
        })
        //Fetch authMe
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false;
        })
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.loading = false;
        })
        //Register user
        builder.addCase(fetchRegister.pending, (state) => {
            state.loading = true;
            state.status = null
        })
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false;
        })
        builder.addCase(fetchRegister.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const selectedIsAuth = (state) => Boolean(state.auth.data)

export const {logout} = authSlice.actions

export const authReducer = authSlice.reducer