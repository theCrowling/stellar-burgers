import { FC } from 'react';
import { useSelector } from '../../services/store'; // путь адаптируй под себя
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const user = useSelector((state) => state.user.user);

  return <AppHeaderUI userName={user?.name || ''} />;
};
