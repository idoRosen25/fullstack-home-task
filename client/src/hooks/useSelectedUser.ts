import { useAppSelector } from '../app/hooks';

const useSelectedUser = () =>
  useAppSelector((state) => state.posts.selectedUser);
export default useSelectedUser;
