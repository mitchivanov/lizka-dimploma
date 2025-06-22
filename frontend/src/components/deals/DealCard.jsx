import React from 'react';
import './DealCard.css';

const DealCard = ({ deal }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getTypeColor = (type) => {
    return type === 'Товар' ? '#4CAF50' : '#2196F3';
  };

  const getTypeBadge = (type) => {
    return type === 'Товар' ? '📦' : '🔧';
  };

  return (
    <div className="deal-card">
      <div className="deal-card-header">
        <div className="deal-type" style={{ backgroundColor: getTypeColor(deal.deal_type_name) }}>
          <span className="deal-type-icon">{getTypeBadge(deal.deal_type_name)}</span>
          <span className="deal-type-text">{deal.deal_type_name}</span>
        </div>
        <div className="deal-branch">{deal.deal_branch_name}</div>
      </div>

      <div className="deal-card-content">
        <h3 className="deal-title">{deal.name_deal}</h3>
        <p className="deal-description">{deal.description}</p>
        
        <div className="deal-company">
          <div className="company-info">
            <strong>{deal.seller_name}</strong>
            <span className="company-location">{deal.region_name}</span>
          </div>
        </div>

        <div className="deal-address">
          📍 {deal.address_deal}
        </div>
      </div>

      <div className="deal-card-footer">
        <div className="deal-pricing">
          <div className="seller-price">
            <span className="price-label">Цена:</span>
            <span className="price-value">{formatPrice(deal.seller_price)}</span>
          </div>
          <div className="commission">
            <span className="commission-label">Комиссия YAMS:</span>
            <span className="commission-value">{formatPrice(deal.YAMS_percent)}</span>
          </div>
          <div className="total-price">
            <span className="total-label">Итого:</span>
            <span className="total-value">{formatPrice(deal.total_cost)}</span>
          </div>
        </div>
        
        <div className="deal-actions">
          <button className="btn-contact">Связаться</button>
          <button className="btn-details">Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default DealCard; 