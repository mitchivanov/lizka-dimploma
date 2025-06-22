import React from 'react';
import './DealsFilters.css';

const DealsFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const dealTypes = ['Все', 'Товар', 'Услуга'];
  const regions = ['Все', 'Москва', 'Санкт-Петербург', 'Подольск', 'Рязань', 'Ростов-на-Дону', 'Краснодар'];
  const branches = [
    'Все',
    'Пищевая промышленность',
    'IT и ПО',
    'Креативные индустрии',
    'Обрабатывающая промышленность',
    'Розничная торговля',
    'Развлечения',
    'Логистика'
  ];

  const priceRanges = [
    { label: 'Все цены', min: 0, max: Infinity },
    { label: 'До 500₽', min: 0, max: 500 },
    { label: '500₽ - 1000₽', min: 500, max: 1000 },
    { label: '1000₽ - 3000₽', min: 1000, max: 3000 },
    { label: '3000₽ - 10000₽', min: 3000, max: 10000 },
    { label: 'Свыше 10000₽', min: 10000, max: Infinity }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({ ...filters, [filterType]: value });
  };

  const getCurrentPriceRange = () => {
    return priceRanges.find(range => 
      range.min === filters.minPrice && range.max === filters.maxPrice
    ) || priceRanges[0];
  };

  const handlePriceRangeChange = (range) => {
    onFilterChange({
      ...filters,
      minPrice: range.min,
      maxPrice: range.max
    });
  };

  return (
    <div className="deals-filters">
      <div className="filters-header">
        <h3>Фильтры</h3>
        <button 
          className="clear-filters-btn" 
          onClick={onClearFilters}
          disabled={Object.values(filters).every(value => 
            value === '' || value === 'Все' || value === 0 || value === Infinity
          )}
        >
          Очистить
        </button>
      </div>

      <div className="filter-group">
        <label className="filter-label">Тип предложения</label>
        <select 
          value={filters.type} 
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="filter-select"
        >
          {dealTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Регион</label>
        <select 
          value={filters.region} 
          onChange={(e) => handleFilterChange('region', e.target.value)}
          className="filter-select"
        >
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Отрасль</label>
        <select 
          value={filters.branch} 
          onChange={(e) => handleFilterChange('branch', e.target.value)}
          className="filter-select"
        >
          {branches.map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Ценовой диапазон</label>
        <select 
          value={getCurrentPriceRange().label}
          onChange={(e) => {
            const selectedRange = priceRanges.find(range => range.label === e.target.value);
            if (selectedRange) {
              handlePriceRangeChange(selectedRange);
            }
          }}
          className="filter-select"
        >
          {priceRanges.map(range => (
            <option key={range.label} value={range.label}>{range.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Поиск по названию</label>
        <input
          type="text"
          placeholder="Введите название..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="filter-input"
        />
      </div>
    </div>
  );
};

export default DealsFilters; 