import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userDataSelector } from '../../services/selectors';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const user = useSelector(userDataSelector);
  const location = useLocation();

  if (!user && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (user && onlyUnAuth) {
    return <Navigate to='/' replace />;
  }

  return children;
};
