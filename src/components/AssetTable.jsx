import React, { useState } from 'react';

const AssetTable = ({ assets }) => {
  const [favorites, setFavorites] = useState([]);

  const handleStar = (index) => {
    setFavorites((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderChangeWithCaret = (value) => {
    const isPositive = parseFloat(value) >= 0;
    const caret = isPositive ? '▲' : '▼';
    const color = isPositive ? 'text-green-500' : 'text-red-500';
    return (
      <span className={`flex items-center justify-end gap-1 ${color}`}>
        <span className="text-xs">{caret}</span>
        {Math.abs(value)}%
      </span>
    );
  };

  const getPriceColorClass = (symbol) => {
    switch (symbol.toUpperCase()) {
      case 'BTC':
        return 'text-red-800';
      case 'ETH':
        return 'text-green-600';
      case 'USDT':
        return 'text-red-500';
      default:
        return 'text-black';
    }
  };

  return (
    <div className="w-full text-sm text-right">
      {/* Header */}
      <div className="grid grid-cols-[30px_30px_180px_100px_80px_80px_80px_180px_180px_160px_120px] gap-4 py-3 border-b border-b-gray-100 font-semibold text-black">
        <span></span>
        <span>#</span>
        <span className="text-left">Name</span>
        <span>Price</span>
        <span>1h %</span>
        <span>24h %</span>
        <span>7d %</span>
        <span>Market Cap</span>
        <span>Volume(24h)</span>
        <span>Circulating Supply</span>
        <span>Last 7 Days</span>
      </div>

      {/* Rows */}
      {assets.map((asset, index) => (
        <div
          key={asset.symbol}
          className="grid grid-cols-[30px_30px_180px_100px_80px_80px_80px_180px_180px_160px_120px] gap-4 py-4 border-b border-b-gray-100 hover:bg-gray-50 transition items-center"
        >
          {/* Star */}
          <span>
            <button onClick={() => handleStar(index)} className="text-xl">
              <span className={favorites.includes(index) ? 'text-yellow-400' : 'text-gray-400'}>
                ★
              </span>
            </button>
          </span>

          {/* Index */}
          <span>{index + 1}</span>

          {/* Name + Logo + Symbol */}
          <span className="flex items-center gap-2 justify-start">
            <img src={`/${asset.logo}`} alt={asset.symbol} className="w-6 h-6" />
            <div className="flex items-center gap-1">
              <span className="font-medium">{asset.name}</span>
              <span className="text-xs text-gray-400 uppercase">{asset.symbol}</span>
            </div>
          </span>

          {/* Price */}
          <span className={`font-medium ${getPriceColorClass(asset.symbol)}`}>
            ${asset.price.toFixed(2)}
          </span>

          {/* 1h %, 24h %, 7d % */}
          {renderChangeWithCaret(asset.change1h)}
          {renderChangeWithCaret(asset.change24h)}
          {renderChangeWithCaret(asset.change7d)}

          {/* Market Cap */}
          <span>${Number(asset.marketCap).toLocaleString()}</span>

          {/* Volume 24h */}
          <span>${Number(asset.volume24h).toLocaleString()}</span>

          {/* Circulating Supply */}
          <span>{asset.circulatingSupply} {asset.symbol}</span>

          {/* Last 7 Days Chart */}
          <span className="flex justify-end pl-4 mr-[-20px]">
            <img src={`/${asset.chart}`} alt="7d chart" className=" h-14 w-auto" />
          </span>
        </div>
      ))}
    </div>
  );
};

export default AssetTable;
