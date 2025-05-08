import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssets, selectAssets } from './store/assetsSlice';
import AssetTable from './components/AssetTable';

const App = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAssets);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateAssets());
    }, 1500);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="overflow-x-auto flex flex-col items-center">
      <h1 className="text-2xl font-bold my-5">Crypto Tracker</h1>
      <AssetTable assets={assets} />
    </div>
  );
};

export default App;
