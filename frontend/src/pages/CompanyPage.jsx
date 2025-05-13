import { useParams } from 'react-router-dom';
import { companies } from '../mocks/companies';
import { Box, Typography, Paper, Avatar, Chip, Link, Stack } from '@mui/material';

const CompanyPage = () => {
  const { id } = useParams();
  const company = companies.find(c => c.id === Number(id));

  if (!company) {
    return <Typography>Компания не найдена</Typography>;
  }

  return (
    <Paper sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar src={company.logo_url} alt={company.name} sx={{ width: 80, height: 80, mr: 3 }} />
        <Box>
          <Typography variant="h4">{company.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{company.slogan}</Typography>
          <Chip label={`Рейтинг: ${company.rating}`} color="primary" sx={{ mt: 1 }} />
        </Box>
      </Box>
      <Typography variant="body1" sx={{ mb: 2 }}>{company.description}</Typography>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography><b>Директор:</b> {company.director_full_name}</Typography>
        <Typography><b>Сотрудников:</b> {company.employees}</Typography>
        <Typography><b>Год основания:</b> {company.year_founded}</Typography>
        <Typography><b>Юр. адрес:</b> {company.legal_address}</Typography>
        <Typography><b>Факт. адрес:</b> {company.actual_address}</Typography>
        <Typography>
          <b>Сайт:</b> <Link href={company.website} target="_blank" rel="noopener">{company.website}</Link>
        </Typography>
        <Typography>
          <b>Соцсети:</b> {company.social_media_links.map(link => (
            <Link key={link} href={link} target="_blank" rel="noopener" sx={{ mr: 1 }}>{link}</Link>
          ))}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default CompanyPage; 