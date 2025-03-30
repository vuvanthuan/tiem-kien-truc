import { createSlice } from '@reduxjs/toolkit';

import { MenuItem } from '@/lib/types/menu';
import { initMenu } from '@/public/mocks/menu';

export interface IDefaultState {
    menu: MenuItem[];
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
