import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosWithAuth.js';

// Action asynchrone pour envoyer une invitation
export const sendInvitation = createAsyncThunk('invitation/send', async ({recipientId,tripId}, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/invitations/send', {recipientId,tripId});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Action asynchrone pour accepter une invitation
export const acceptInvitation = createAsyncThunk('invitation/accept', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/invitations/accept/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Action asynchrone pour refuser une invitation
export const declineInvitation = createAsyncThunk('invitation/decline', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/invitations/decline/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Action asynchrone pour récupérer les invitations d'un utilisateur
export const getInvitations = createAsyncThunk('invitation/getInvitations', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/invitations');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Action asynchrone pour annuler une invitation
export const cancelInvitation = createAsyncThunk('invitation/cancel', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/invitations/cancel/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const invitationSlice = createSlice({
  name: 'invitation',
  initialState: {
    invitations: [],
    status: 'idle',
    message:'',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendInvitation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendInvitation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invitations.push(action.payload.invitation);
        state.message=action.payload.message
      })
      .addCase(sendInvitation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(acceptInvitation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(acceptInvitation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invitations = state.invitations.map((inv) =>
          inv._id === action.payload.invitation._id ? action.payload.invitation : inv
        );
      })
      .addCase(acceptInvitation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(declineInvitation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(declineInvitation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invitations = state.invitations.map((inv) =>
          inv._id === action.payload.invitation._id ? action.payload.invitation : inv
        );
      })
      .addCase(declineInvitation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(getInvitations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInvitations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invitations = action.payload;
      })
      .addCase(getInvitations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(cancelInvitation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cancelInvitation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invitations = state.invitations.filter(inv => inv._id !== action.payload.id);
        state.message=action.payload.message
      })
      .addCase(cancelInvitation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const selectInvitations = (state) => state.invitation.invitations;
export const selectInvitationsStatus = (state) => state.invitation.status;
export const selectInvitationsError = (state) => state.invitation.error;
export const selectInvitationsMessage=(state)=>state.invitation.message
export default invitationSlice.reducer;

