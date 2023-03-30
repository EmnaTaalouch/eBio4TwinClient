// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  return (
    <Avatar src={null} alt={'mocha'} color={createAvatar('mocha').color} {...other}>
      {createAvatar('mocha').name}
    </Avatar>
  );
}
