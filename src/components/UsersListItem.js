import { GoTrashcan } from "react-icons/go";
import Button from './Button';
import { deleteUser } from '../store';
import { useThunk } from '../hooks/use-thunk';

function UsersListItem({ user }) {
    const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

    const handleClick = () => {
        doDeleteUser(user);
    }

    return (
        <div className='mb-2 border rounded'>
            <div className="flex p-2 justify-between items-center cursor-pointer">
                <Button loading={isLoading} onClick={handleClick}>
                    <GoTrashcan /> Delete
                </Button>
                {error && <div>Error deleting User...</div>}
            </div>
        </div>
    );
}

export default UsersListItem;