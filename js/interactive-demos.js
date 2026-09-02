/**
 * DEEPAK R PORTFOLIO - INTERACTIVE DEMOS & SIMULATORS
 * Interactive weather widget simulator and pet paradise marketplace demo
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. PET PARADISE MARKETPLACE DEMO SIMULATOR
  // -------------------------------------------------------------------------
  const petContainer = document.getElementById('pet-demo-container');
  if (petContainer) {
    const samplePets = [
      { id: 1, name: 'Golden Retriever Pup', category: 'Dogs', price: '₹12,500', location: 'Chennai', status: 'Available', image: '🐶', breed: 'Purebred Golden' },
      { id: 2, name: 'Persian Kitten', category: 'Cats', price: '₹9,000', location: 'Coimbatore', status: 'Available', image: '🐱', breed: 'Doll Face Persian' },
      { id: 3, name: 'Cockatiel Pair', category: 'Birds', price: '₹4,500', location: 'Dindigul', status: 'Pending', image: '🦜', breed: 'Lutino Cockatiel' },
      { id: 4, name: 'German Shepherd', category: 'Dogs', price: '₹15,000', location: 'Madurai', status: 'Available', image: '🐕', breed: 'Double Coat GSD' }
    ];

    function renderPets(filterCat = 'All') {
      petContainer.innerHTML = '';
      const filtered = filterCat === 'All' ? samplePets : samplePets.filter(p => p.category === filterCat);

      filtered.forEach(pet => {
        const card = document.createElement('div');
        card.className = 'sim-stat-box';
        card.style.flexDirection = 'row';
        card.style.justifyContent = 'space-between';
        card.style.alignItems = 'center';
        card.style.padding = '0.75rem 1rem';
        card.style.background = 'rgba(15, 23, 42, 0.7)';
        card.style.borderRadius = 'var(--radius-md)';
        card.style.border = '1px solid rgba(255, 255, 255, 0.08)';

        card.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="font-size: 1.8rem; background: rgba(0,240,255,0.1); width: 42px; height: 42px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">${pet.image}</div>
            <div>
              <div style="font-weight: 700; color: #ffffff; font-size: 0.9rem;">${pet.name}</div>
              <div style="font-size: 0.75rem; color: #94a3b8;">${pet.breed} • ${pet.location}</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 700; color: var(--accent-cyan); font-size: 0.95rem;">${pet.price}</div>
            <span class="badge ${pet.status === 'Available' ? 'badge-emerald' : 'badge-violet'}" style="font-size: 0.68rem; padding: 0.15rem 0.4rem;">${pet.status}</span>
          </div>
        `;
        petContainer.appendChild(card);
      });
    }

    renderPets();

    const petFilters = document.querySelectorAll('.pet-demo-filter');
    petFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        petFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPets(btn.getAttribute('data-pet-cat'));
      });
    });
  }

  // -------------------------------------------------------------------------
  // 2. WEATHER FORECAST APP LIVE SIMULATOR
  // -------------------------------------------------------------------------
  const weatherCityInput = document.getElementById('weather-city-input');
  const weatherSearchBtn = document.getElementById('weather-search-btn');
  const weatherCityName = document.getElementById('weather-city-name');
  const weatherTemp = document.getElementById('weather-temp');
  const weatherDesc = document.getElementById('weather-desc');
  const weatherHumidity = document.getElementById('weather-humidity');
  const weatherWind = document.getElementById('weather-wind');
  const weatherIcon = document.getElementById('weather-icon');

  const weatherData = {
    'dindigul': { name: 'Dindigul, IN', temp: '32°C', desc: 'Partly Cloudy', humidity: '64%', wind: '12 km/h', icon: 'cloud-sun' },
    'chennai': { name: 'Chennai, IN', temp: '34°C', desc: 'Humid & Clear', humidity: '78%', wind: '18 km/h', icon: 'sun' },
    'coimbatore': { name: 'Coimbatore, IN', temp: '29°C', desc: 'Pleasant Breeze', humidity: '58%', wind: '14 km/h', icon: 'wind' },
    'bangalore': { name: 'Bengaluru, IN', temp: '26°C', desc: 'Light Rain Showers', humidity: '72%', wind: '16 km/h', icon: 'cloud-rain' }
  };

  function updateWeather(cityQuery) {
    const key = cityQuery.toLowerCase().trim();
    const data = weatherData[key] || {
      name: `${cityQuery.charAt(0).toUpperCase() + cityQuery.slice(1)}, IN`,
      temp: `${Math.floor(Math.random() * 10 + 25)}°C`,
      desc: 'Clear Sky',
      humidity: `${Math.floor(Math.random() * 30 + 50)}%`,
      wind: `${Math.floor(Math.random() * 10 + 10)} km/h`,
      icon: 'sun'
    };

    if (weatherCityName) weatherCityName.textContent = data.name;
    if (weatherTemp) weatherTemp.textContent = data.temp;
    if (weatherDesc) weatherDesc.textContent = data.desc;
    if (weatherHumidity) weatherHumidity.textContent = data.humidity;
    if (weatherWind) weatherWind.textContent = data.wind;

    if (weatherIcon && window.lucide) {
      weatherIcon.setAttribute('data-lucide', data.icon);
      window.lucide.createIcons();
    }
  }

  if (weatherSearchBtn && weatherCityInput) {
    weatherSearchBtn.addEventListener('click', () => {
      if (weatherCityInput.value) {
        updateWeather(weatherCityInput.value);
      }
    });

    weatherCityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && weatherCityInput.value) {
        updateWeather(weatherCityInput.value);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. CAFE STALL INTERACTIVE BREW SIMULATOR
  // -------------------------------------------------------------------------
  const cafeOrderBtn = document.getElementById('cafe-order-btn');
  const cafeCoffeeSelect = document.getElementById('cafe-coffee-select');
  const cafeSizeSelect = document.getElementById('cafe-size-select');
  const cafeCartTotal = document.getElementById('cafe-cart-total');
  const cafeStatusMsg = document.getElementById('cafe-status-msg');

  if (cafeCoffeeSelect && cafeSizeSelect && cafeCartTotal) {
    const prices = {
      'espresso': { base: 120, name: 'Signature Espresso' },
      'cappuccino': { base: 160, name: 'Velvet Cappuccino' },
      'latte': { base: 180, name: 'Hazelnut Latte' },
      'coldbrew': { base: 200, name: 'Nitro Cold Brew' }
    };

    const sizeMultipliers = {
      'small': 1.0,
      'medium': 1.25,
      'large': 1.5
    };

    function calculateCafeTotal() {
      const coffeeKey = cafeCoffeeSelect.value;
      const sizeKey = cafeSizeSelect.value;
      const coffee = prices[coffeeKey] || prices['espresso'];
      const multiplier = sizeMultipliers[sizeKey] || 1.0;
      const total = Math.round(coffee.base * multiplier);

      if (cafeCartTotal) {
        cafeCartTotal.textContent = `₹${total}`;
      }
    }

    cafeCoffeeSelect.addEventListener('change', calculateCafeTotal);
    cafeSizeSelect.addEventListener('change', calculateCafeTotal);

    if (cafeOrderBtn && cafeStatusMsg) {
      cafeOrderBtn.addEventListener('click', () => {
        const coffee = prices[cafeCoffeeSelect.value].name;
        cafeStatusMsg.style.display = 'block';
        cafeStatusMsg.innerHTML = `<span style="color: #34d399;">✓ Order Placed!</span> Brewing ${coffee} (${cafeSizeSelect.value.toUpperCase()})...`;
        setTimeout(() => {
          cafeStatusMsg.style.display = 'none';
        }, 4000);
      });
    }

    calculateCafeTotal();
  }

})();

