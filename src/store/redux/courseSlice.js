import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getCourses, addCourse, editCourse, deleteCourse } from '../../services/api';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (_, { rejectWithValue }) => {
    try {
        const data = await getCourses();
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Gagal mengambil data');
    }
});

export const createCourse = createAsyncThunk('courses/createCourse', async (courseData, { rejectWithValue }) => {
    try {
        const data = await addCourse(courseData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Gagal menambahkan course');
    }
});

export const updateCourse = createAsyncThunk('courses/updateCourse', async ({ id, courseData }, { rejectWithValue }) => {
    try {
        const data = await editCourse(id, courseData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Gagal mengupdate course');
    }
});

export const removeCourse = createAsyncThunk('courses/removeCourse', async (id, { rejectWithValue }) => {
    try {
        await deleteCourse(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Gagal menghapus course');
    }
});

const initialState = {
    courses: [],
    loading: false,
    error: null,
    selectedCategories: [],
    selectedDuration: null,
    selectedPrice: 'Semua',
    searchQuery: '',
    sortBy: 'default',
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        toggleCategory: (state, action) => {
            const category = action.payload;
            if (state.selectedCategories.includes(category)) {
                state.selectedCategories = state.selectedCategories.filter(c => c !== category);
            } else {
                state.selectedCategories = [...state.selectedCategories, category];
            }
        },
        setDuration: (state, action) => {
            state.selectedDuration = action.payload;
        },
        setPrice: (state, action) => {
            state.selectedPrice = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        resetFilters: (state) => {
            state.selectedCategories = [];
            state.selectedDuration = null;
            state.selectedPrice = 'Semua';
            state.searchQuery = '';
            state.sortBy = 'default';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.courses.push(action.payload);
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                const index = state.courses.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.courses[index] = action.payload;
                }
            })
            .addCase(removeCourse.fulfilled, (state, action) => {
                state.courses = state.courses.filter(c => c.id !== action.payload);
            });
    },
});

export const {
    toggleCategory,
    setDuration,
    setPrice,
    setSearchQuery,
    setSortBy,
    resetFilters
} = courseSlice.actions;

export const selectFilteredCourses = createSelector(
    (state) => state.courses,
    (coursesState) => {
        const coursesArray = Array.isArray(coursesState.courses) ? coursesState.courses : [];
        let filtered = coursesArray;
        if (coursesState.selectedCategories.length > 0) {
            filtered = filtered.filter(course =>
                coursesState.selectedCategories.includes(course.category)
            );
        }
        if (coursesState.selectedDuration) {
            filtered = filtered.filter(course =>
                course.duration === coursesState.selectedDuration
            );
        }
        if (coursesState.selectedPrice === 'Gratis') {
            filtered = filtered.filter(course => course.price === 0);
        } else if (coursesState.selectedPrice === 'Berbayar') {
            filtered = filtered.filter(course => course.price > 0);
        }
        if (coursesState.searchQuery) {
            const query = coursesState.searchQuery.toLowerCase();
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query)
            );
        }
        if (coursesState.sortBy === 'price-low') {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (coursesState.sortBy === 'price-high') {
            filtered = [...filtered].sort((a, b) => b.price - a.price);
        } else if (coursesState.sortBy === 'rating-high') {
            filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        } else if (coursesState.sortBy === 'a-z') {
            filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        } else if (coursesState.sortBy === 'z-a') {
            filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
        }
        return filtered;
    }
);

export default courseSlice.reducer;