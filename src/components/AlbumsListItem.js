import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { GoTrashcan } from 'react-icons/go';

function AlbumsListItem({ album }) {
    const header = <div>
        <Button className='mr-2'>
            <GoTrashcan />
        </Button>
        {album.title}
        </div>;
    return (
        <ExpandablePanel key={album.id} header={header}>
            List of photos in the album
        </ExpandablePanel>
    );
};

export default AlbumsListItem;