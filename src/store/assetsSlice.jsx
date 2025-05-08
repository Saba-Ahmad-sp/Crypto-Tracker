import { createSlice } from '@reduxjs/toolkit';
import sampleData from '../data/sampleCryptoData';

const getRandomChange = () => (Math.random() * 2 - 1).toFixed(2);
const getRandomVolume = () => (Math.random() * 1000000000).toFixed(0);

const assetsSlice = createSlice({
  name: 'assets',
  initialState: sampleData,
  reducers: {
    updateAssets: (state) => {
      return state.map(asset => {
        const priceChange = parseFloat(getRandomChange());
        const newPrice = +(parseFloat(asset.price) + priceChange).toFixed(2);
        return {
          ...asset,
          price: newPrice,
          change1h: getRandomChange(),
          change24h: getRandomChange(),
          change7d: getRandomChange(),
          volume24h: getRandomVolume(),
        };
      });
    },
  },
});

export const { updateAssets } = assetsSlice.actions;
export const selectAssets = (state) => state.assets;
export default assetsSlice.reducer;