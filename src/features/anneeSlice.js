import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {lien_create, lien_read} from "../Components/Static/Liens";

const initialState = {
    items: [],
    status: null,
    error: null
}

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("authToken")
    }
}

export const anneeFetch = createAsyncThunk("readyear", async (id = null, {rejectWithValue}) => {
    try {

        const response = await axios.get(`${lien_read}/readyear`, config)
        return response.data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const add_Year = async (donner) => {
    const response = await axios.post(`${lien_create}/addyear`, donner, config)
    const {data} = response
    return data
}

const anneeSlice = createSlice({
    name: "annee",
    initialState,
    reducers: {},
    extraReducers: {
        [anneeFetch.pending]: (state, action) => {
            state.status = "pending"
        },
        [anneeFetch.fulfilled]: (state, action) => {
            state.status = "success"
            state.items = action.payload
        },
        [anneeFetch.rejected]: (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        }
    }
})
export default anneeSlice.reducer
