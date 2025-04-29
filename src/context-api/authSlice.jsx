import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://6801242781c7e9fbcc41aacf.mockapi.io/api/AV1/users';

const initialState = {
  userType: '',
  registrationData: {},
  isOTPSent: false,
  otp: '',
  isVerified: false,
  isLoggedIn: false,
  loading: false,
  error: null,
  token: null,
  user: null,
  isAuthenticated: false,
  email: null,
  phone: null, // Add phone to the state
};

// Register user async thunk
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    console.log('Registering user...', userData);
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.error('Failed to register user:', response.statusText);
      throw new Error('Failed to register user');
    }

    const data = await response.json();

    // Save registration data in localStorage, including email and phone
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('email', data.email); // Save email
    localStorage.setItem('phone', data.phone); // Save phone

    console.log('Registration successful:', data);
    return data;

  } catch (err) {
    console.error('Error during registration:', err);
    return rejectWithValue(err.message);
  }
});

// Login user async thunk
export const loginUser = createAsyncThunk('auth/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    console.log('Logging in user...', loginData);
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      // Check if email-based login
      if (loginData.email && storedUser.email === loginData.email && storedUser.password === loginData.password) {
        const mockToken = `mock-token-${storedUser.id}`; // Simulated token
        localStorage.setItem('token', mockToken);
        console.log('Login successful with email');
        return { user: storedUser, token: mockToken };
      }
      
      // Check if phone-based login with OTP
      if (loginData.phone && storedUser.phone === loginData.phone) {
        // Generate OTP and send (here we mock it)
        const mockToken = `mock-token-${storedUser.id}`; // Simulated token
        localStorage.setItem('token', mockToken);
        console.log('Login successful with phone');
        return { user: storedUser, token: mockToken };
      }

      console.error('Invalid credentials');
      throw new Error('Invalid credentials');
    }

    console.error('No registered user found');
    throw new Error('No registered user found');
  } catch (err) {
    console.error('Error during login:', err);
    return rejectWithValue(err.message);
  }
});

// Verify OTP async thunk
export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (otp, { getState, rejectWithValue }) => {
  try {
    console.log('Verifying OTP:', otp);
    const expectedOTP = getState().auth.otp;
    if (otp === expectedOTP) {
      console.log('OTP verified successfully');
      return true;
    } else {
      console.error('Invalid OTP');
      throw new Error('Invalid OTP');
    }
  } catch (err) {
    console.error('Error during OTP verification:', err);
    return rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoggedIn = !!action.payload;
      state.token = localStorage.getItem('token');
      state.email = localStorage.getItem('email');
      state.phone = localStorage.getItem('phone'); // Retrieve phone from localStorage
    },

    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    saveRegistrationData: (state, action) => {
      state.registrationData = action.payload;
    },
    sendOTP: (state) => {
      state.isOTPSent = true;
      state.otp = '123456'; // 🔐 Mock OTP
    },
    setOTP: (state, action) => {
      state.otp = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.email = null;
      state.phone = null; // Clear phone on logout
      state.isAuthenticated = false;
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        console.log('Registration is in progress...');
        state.loading = true;
        state.error = null;  // Clear previous errors
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('Registration finished successfully');
        state.loading = false;
        state.isOTPSent = true;
        state.registrationData = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.error('Registration failed:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Registration failed. Please try again.';
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        console.log('Login is in progress...');
        state.loading = true;
        state.error = null;  // Clear previous errors
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Login finished successfully');
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.email = localStorage.getItem('email');
        state.phone = localStorage.getItem('phone');
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error('Login failed:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Login failed. Invalid credentials or network issues.';
      })

      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        console.log('OTP verification is in progress...');
        state.loading = true;
        state.error = null;  // Clear previous errors
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        console.log('OTP verification finished successfully');
        state.loading = false;
        state.isVerified = true;
        state.isLoggedIn = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        console.error('OTP verification failed:', action.payload);
        state.loading = false;
        state.error = action.payload || 'OTP verification failed. Please try again.';
      });
  },
});

export const {
  setUserType,
  saveRegistrationData,
  sendOTP,
  setOTP,
  logout,
  setUser
} = authSlice.actions;

export default authSlice.reducer;
