import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios/axios";


const initialState = {
    data: null,
    token: null,
    status: null,
    users: [],
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
            return { error: 'Произошла ошибка при выполнении запроса.' }
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

export const fetchAuthMe = createAsyncThunk(
    'auth/fetchAuthMe',
    async () => {
        const {data} = await axios.get('/auth/user')
        return data
    })

export const fetchUsers = createAsyncThunk(
    'auth/fetchUsers',
    async () => {
        const {data} = await axios.get('/auth/users')
        return data
    }
)

export const fetchBlockUsers = createAsyncThunk(
    'auth/fetchBlockUsers',
    async (userIds) => {
        const {data} = await axios.post(`/block`, {userIds})
        return data
    }
)

export const fetchUnBlockUsers = createAsyncThunk(
    'auth/fetchUnBlockUsers',
    async (userIds) => {
        const {data} = await axios.post(`/unblock`, {userIds})
        return data
    }
)

export const fetchRemoveUser = createAsyncThunk(
    'news/fetchRemoveUser',
    async (userId) => {
        const {data} = await axios.delete(`/delete/${userId}`)
        return data
    })

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.loading = true;
            state.status = null
        })
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.message
            state.data = action.payload
            state.token = action.payload.token
            state.isAuth = true;
        })
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload
            state.isAuth = false;
        })
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
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.loading = false
        })
        builder.addCase(fetchUsers.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(fetchBlockUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchBlockUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = state.users.map((user) => {
                if (user._id === action.payload._id) {
                    const updatedUser = {
                        ...user,
                        status: action.payload.newStatus,
                    };
                    return updatedUser;
                }
                return user;
            });
        })
        builder.addCase(fetchBlockUsers.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUnBlockUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUnBlockUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = state.users.map((user) => {
                if (user._id === action.payload._id) {
                    const updatedUser = {
                        ...user,
                        status: action.payload.newStatus,
                    };
                    return updatedUser;
                }
                return user;
            });
        })
        builder.addCase(fetchUnBlockUsers.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(fetchRemoveUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchRemoveUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.filter((user)=> user._id !== action.payload._id)
        })
        builder.addCase(fetchRemoveUser.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const selectedIsAuth = (state) => Boolean(state.auth.data)

export const {logout} = authSlice.actions

export const authReducer = authSlice.reducer