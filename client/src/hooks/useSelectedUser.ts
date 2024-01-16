import { useAppSelector } from '../redux/hooks';

const useSelectedUser = () =>
  useAppSelector((state) => state.posts.selectedUser);
export default useSelectedUser;
