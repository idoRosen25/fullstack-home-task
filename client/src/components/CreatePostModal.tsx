import {
  Box,
  Divider,
  Modal,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AlertTypes, CreatePostSchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addAlert,
  setIsCreatePostModalOpen,
} from '../redux/features/post/postSlice';
import { isDesktop } from 'react-device-detect';
import { useCreatePostMutation } from '../redux/api/posts';

type Props = {
  userId: number;
  name: string;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: isDesktop ? 400 : '90%',
  bgcolor: '#fff',
  border: '1px solid #000',
  boxShadow: 24,
  px: 4,
  py: 2,
  borderRadius: '8px',
};

type FieldValues = z.infer<typeof CreatePostSchema>;

const CreatePostModal: React.FC<Props> = ({ userId, name }) => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    (state) => state.posts.isCreatePostModalOpen,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      userId,
    },
  });

  const handleClose = () => {
    dispatch(setIsCreatePostModalOpen(false));
    reset();
  };
  const [mutate, { isLoading, error: RtkError }] = useCreatePostMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await mutate(data);
      handleClose();
      dispatch(
        addAlert({
          id: new Date().getTime(),
          type: AlertTypes.SUCCESS,
          text: 'Post created successfully',
        }),
      );
    } catch (error) {
      console.log('failed to create post: ', error);
      console.log('error from RTK: ', RtkError);
      dispatch(
        addAlert({
          id: new Date().getTime(),
          type: AlertTypes.ERROR,
          text: `Failed to create post. Error: ${error?.toString()}`,
        }),
      );
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{
          zIndex: 10,
          fontSize: '10px',
          width: 'max-content',
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(setIsCreatePostModalOpen(true));
        }}
      >
        New post
      </Button>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" className="text-black">
            Create post for {name}
          </Typography>
          <Divider sx={{ marginBottom: '1rem' }} />
          <TextField
            error={!!errors.title?.message}
            id="outlined-error"
            label="Title"
            helperText={errors.title?.message}
            sx={{ marginBottom: '1.5rem', width: '100%' }}
            {...register('title', { required: true })}
          />
          <TextField
            error={!!errors.body?.message}
            id="outlined-body"
            label="Content"
            helperText={errors.body?.message}
            multiline
            minRows={4}
            sx={{ marginBottom: '1.5rem', width: '100%' }}
            {...register('body', {
              required: true,
            })}
          />

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ marginRight: '1rem' }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  size={'2rem'}
                  sx={{ opacity: isLoading ? '100%' : '0' }}
                />
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CreatePostModal;
