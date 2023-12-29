import { useRemoveAlbumMutation } from "../store";
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { GoTrashcan } from 'react-icons/go';

function AlbumsListItem({ album }) {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleRemoveAlbum = () => {
        removeAlbum(album);
    };

    const header = (
    <>
        <Button 
            loading={results.isLoading}
            onClick={handleRemoveAlbum}
            className='mr-2'>
            <GoTrashcan />
        </Button>
        {album.title}
        </>
        );
    return (
        <ExpandablePanel key={album.id} header={header}>
            List of photos in the album
        </ExpandablePanel>
    );
};

export default AlbumsListItem;