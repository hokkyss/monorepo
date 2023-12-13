import { useTranslation } from '../../configs/locale/locale.config';

export default function LoginPage() {
  const t = useTranslation('login');

  return <div>{t('login')}</div>;
}
