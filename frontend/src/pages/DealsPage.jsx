import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import DealCard from '../components/deals/DealCard';
import DealsFilters from '../components/deals/DealsFilters';
import { deals } from '../mocks/deals';

const DealsPage = () => {
  const [filters, setFilters] = useState({
    type: 'Все',
    region: 'Все',
    branch: 'Все',
    minPrice: 0,
    maxPrice: Infinity,
    search: ''
  });

  const [sortBy, setSortBy] = useState('newest');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'Все',
      region: 'Все',
      branch: 'Все',
      minPrice: 0,
      maxPrice: Infinity,
      search: ''
    });
  };

  const filteredDeals = useMemo(() => {
    let filtered = deals.filter(deal => {
      // Фильтр по типу
      if (filters.type !== 'Все' && deal.deal_type_name !== filters.type) {
        return false;
      }

      // Фильтр по региону
      if (filters.region !== 'Все' && deal.region_name !== filters.region) {
        return false;
      }

      // Фильтр по отрасли
      if (filters.branch !== 'Все' && deal.deal_branch_name !== filters.branch) {
        return false;
      }

      // Фильтр по цене
      if (deal.seller_price < filters.minPrice || deal.seller_price > filters.maxPrice) {
        return false;
      }

      // Поиск по названию
      if (filters.search && !deal.name_deal.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      return true;
    });

    // Сортировка
    switch (sortBy) {
      case 'priceAsc':
        filtered.sort((a, b) => a.seller_price - b.seller_price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.seller_price - a.seller_price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name_deal.localeCompare(b.name_deal, 'ru'));
        break;
      default: // newest
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [deals, filters, sortBy]);

  const dealTypeStats = useMemo(() => {
    const stats = {
      total: filteredDeals.length,
      goods: filteredDeals.filter(deal => deal.deal_type_name === 'Товар').length,
      services: filteredDeals.filter(deal => deal.deal_type_name === 'Услуга').length
    };
    return stats;
  }, [filteredDeals]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      
      <div style={{ width: '1440px', margin: '0 auto', background: '#f8f9fa', minHeight: 'calc(100vh - 96px)', padding: '0 20px' }}>
        {/* Hero Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '60px 20px 40px 20px',
          textAlign: 'center',
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <h1 style={{ 
            margin: '0 0 12px 0',
            fontSize: '42px',
            fontWeight: '800',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Лента предложений
          </h1>
          <p style={{ 
            margin: '0',
            fontSize: '18px',
            opacity: '0.9',
            fontWeight: '300'
          }}>
            Найдите лучшие товары и услуги от проверенных компаний
          </p>
        </div>

        {/* Main Content */}
        <div style={{ paddingBottom: '40px' }}>
        <div style={{ 
          display: 'flex',
          gap: '40px',
          alignItems: 'flex-start'
        }}>
          {/* Sidebar */}
          <div style={{ width: '320px', flexShrink: 0 }}>
            <DealsFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div style={{ flex: 1 }}>
            {/* Stats and Controls */}
            <div style={{ 
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e1e5e9'
            }}>
              <div style={{ 
                display: 'flex',
                gap: '24px',
                marginBottom: '20px',
                paddingBottom: '20px',
                borderBottom: '1px solid #e1e5e9'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <span style={{ fontSize: '28px', fontWeight: '800', color: '#2c3e50', lineHeight: '1' }}>
                    {dealTypeStats.total}
                  </span>
                  <span style={{ 
                    fontSize: '12px',
                    color: '#6c757d',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '600',
                    marginTop: '4px'
                  }}>
                    всего предложений
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <span style={{ fontSize: '28px', fontWeight: '800', color: '#2c3e50', lineHeight: '1' }}>
                    {dealTypeStats.goods}
                  </span>
                  <span style={{ 
                    fontSize: '12px',
                    color: '#6c757d',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '600',
                    marginTop: '4px'
                  }}>
                    товаров
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <span style={{ fontSize: '28px', fontWeight: '800', color: '#2c3e50', lineHeight: '1' }}>
                    {dealTypeStats.services}
                  </span>
                  <span style={{ 
                    fontSize: '12px',
                    color: '#6c757d',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '600',
                    marginTop: '4px'
                  }}>
                    услуг
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <label style={{ color: '#495057', fontSize: '14px', fontWeight: '600' }}>
                  Сортировка:
                </label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 40px 8px 12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#495057',
                    background: 'white',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px'
                  }}
                >
                  <option value="newest">Сначала новые</option>
                  <option value="priceAsc">По цене ↑</option>
                  <option value="priceDesc">По цене ↓</option>
                  <option value="name">По названию</option>
                </select>
              </div>
            </div>

            {/* Deals Grid */}
            {filteredDeals.length === 0 ? (
              <div style={{ 
                textAlign: 'center',
                padding: '80px 20px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e1e5e9'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px', opacity: '0.5' }}>🔍</div>
                <h3 style={{ 
                  margin: '0 0 12px 0',
                  color: '#2c3e50',
                  fontSize: '24px',
                  fontWeight: '700'
                }}>
                  Предложения не найдены
                </h3>
                <p style={{ 
                  margin: '0 0 24px 0',
                  color: '#6c757d',
                  fontSize: '16px'
                }}>
                  Попробуйте изменить параметры фильтрации
                </p>
                <button 
                  onClick={handleClearFilters}
                  style={{
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px'
                  }}
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '24px'
              }}>
                {filteredDeals.map(deal => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DealsPage; 