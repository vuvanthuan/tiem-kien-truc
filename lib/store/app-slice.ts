import { createSlice } from '@reduxjs/toolkit';

import { IMenuWebsite } from '@/lib/types/menu';
import { initMenu } from '@/public/mocks/menu';

export interface IDefaultState {
    menu: IMenuWebsite[];
}

const initialState: IDefaultState = {
    menu: initMenu
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {}
});

export default appSlice.reducer;
