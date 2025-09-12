import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MentorsFilter = {
  searchString: string;
  selectedSkills: Array<string>;
};
const initialState: MentorsFilter = {
  searchString: '',
  selectedSkills: [],
};

export const mentorsFilter = createSlice({
  initialState: initialState,
  name: 'mentorsFilter',

  reducers: create => ({
    changeSearchString: create.reducer(
      (state, { payload }: PayloadAction<string>) => ({
        ...state,
        searchString: payload,
      }),
    ),

    resetFilters: create.reducer(state => ({
      ...state,
      selectedSkills: [],
    })),

    resetSearch: create.reducer(state => ({
      ...state,
      searchString: '',
    })),

    toggleSkill: create.reducer((state, { payload }: PayloadAction<string>) => {
      const isSkillExisting = state.selectedSkills.find(
        skill => skill === payload,
      );
      const nextSkills = isSkillExisting
        ? state.selectedSkills.filter(skill => skill !== payload)
        : [...state.selectedSkills, payload];

      return {
        ...state,
        selectedSkills: nextSkills,
      };
    }),
  }),
});

export const selectSelectedSkills = ({ mentorsFilter }: RootState) =>
  mentorsFilter.selectedSkills;

export const selectSearchString = ({ mentorsFilter }: RootState) =>
  mentorsFilter.searchString;

export const { changeSearchString, toggleSkill, resetFilters, resetSearch } =
  mentorsFilter.actions;
