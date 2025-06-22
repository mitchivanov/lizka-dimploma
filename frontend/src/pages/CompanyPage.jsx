import { useParams } from 'react-router-dom';
import { companies } from '../mocks/companies';
import Header from '../components/Header';

const CompanyPage = () => {
  const { id } = useParams();
  const company = companies.find(c => c.id === Number(id));

  if (!company) {
    return (
      <>
        <Header />
        <div style={{ width: '1440px', margin: '0 auto', padding: '40px 20px' }}>
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#6c757d' }}>
            Компания не найдена
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ width: '1440px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          background: 'white',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <img 
              src={company.logo} 
              alt={company.name} 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                marginRight: '24px',
                objectFit: 'cover'
              }} 
            />
            <div>
              <h1 style={{ 
                fontSize: '32px',
                fontWeight: '700',
                margin: '0 0 8px 0',
                color: '#2c3e50'
              }}>
                {company.name}
              </h1>
              <p style={{ 
                fontSize: '16px',
                color: '#6c757d',
                margin: '0 0 8px 0'
              }}>
                {company.slogan}
              </p>
              <span style={{ 
                display: 'inline-block',
                background: '#1976d2',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Рейтинг: {company.rating}
              </span>
            </div>
          </div>
          
          <p style={{ 
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '24px',
            color: '#495057'
          }}>
            {company.description}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: '0', fontSize: '16px', color: '#495057' }}>
              <strong>Директор:</strong> {company.director_full_name}
            </p>
            <p style={{ margin: '0', fontSize: '16px', color: '#495057' }}>
              <strong>Сотрудников:</strong> {company.employees}
            </p>
            <p style={{ margin: '0', fontSize: '16px', color: '#495057' }}>
              <strong>Год основания:</strong> {company.year_founded}
            </p>
            <p style={{ margin: '0', fontSize: '16px', color: '#495057' }}>
              <strong>Юр. адрес:</strong> {company.legal_address}
            </p>
            <p style={{ margin: '0', fontSize: '16px', color: '#495057' }}>
              <strong>Факт. адрес:</strong> {company.actual_address}
            </p>
            <p style={{ margin: '0', fontSize: '16px', color: '#495057' }}>
              <strong>Сайт:</strong>{' '}
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#1976d2', textDecoration: 'none' }}
              >
                {company.website}
              </a>
            </p>
            <div style={{ margin: '0', fontSize: '16px', color: '#495057' }}>
              <strong>Соцсети:</strong>{' '}
              {company.social_media_links.map((link, index) => (
                <span key={link}>
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#1976d2', textDecoration: 'none' }}
                  >
                    {link}
                  </a>
                  {index < company.social_media_links.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyPage; 