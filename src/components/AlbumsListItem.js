import { useRemoveAlbumMutation } from "../store";
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { GoTrashcan } from 'react-icons/go';
import PhotosList from './PhotosList';

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
            <PhotosList album={album} />
        </ExpandablePanel>
    );
};

export default AlbumsListItem;