import { Alert, AlertTitle } from '@mui/material';
import { AlertProps } from '../types';
import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { removeAlert } from '../app/features/post/postSlice';

const Toaster: React.FC<AlertProps> = ({ id, type, text }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timeout = setTimeout(() => dispatch(removeAlert(id)), 3000);
    return () => clearTimeout(timeout);
  }, [dispatch, id]);

  return (
    <Alert severity={type} sx={{ width: '20rem' }}>
      <AlertTitle sx={{ textTransform: 'capitalize' }}>{type}</AlertTitle>
      {text}
    </Alert>
  );
};

export default Toaster;
