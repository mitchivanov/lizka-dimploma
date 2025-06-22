import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ 
      background: 'white', 
      borderBottom: '1px solid #e0e0e0',
      marginBottom: '32px',
      width: '1440px', 
    }}>
      <div style={{ 
        width: '1440px', 
        margin: '0 auto', 
        padding: '0 20px',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px', 
              cursor: 'pointer' 
            }} 
            onClick={() => navigate('/')}
          >
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: '#1976d2',
              borderRadius: '8px'
            }} />
            <h2 style={{ 
              margin: '0',
              color: '#1976d2', 
              fontWeight: '700', 
              letterSpacing: '1px',
              fontSize: '24px'
            }}>
              YAMS
            </h2>
          </div>
          <button 
            onClick={() => navigate('/deals')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#1976d2',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(25, 118, 210, 0.08)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Предложения
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isAuthenticated ? (
            <>
              <span style={{ color: '#666', fontSize: '16px' }}>
                {user?.role === 'company' ? 'Компания' : 'Пользователь'}
              </span>
              <button 
                onClick={logout}
                style={{
                  background: 'transparent',
                  border: '2px solid #1976d2',
                  color: '#1976d2',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#1976d2';
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#1976d2';
                }}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/auth')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#1976d2',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                Войти
              </button>
              <button 
                onClick={() => navigate('/auth', { state: { defaultTab: 1 } })}
                style={{
                  background: 'transparent',
                  border: '2px solid #1976d2',
                  color: '#1976d2',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                Регистрация
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header; 