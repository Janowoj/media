import {useFetchAlbumsQuery} from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import { albumsApi } from '../store/apis/albumsApi';

function AlbumsList({ user }) {
    const {data, error, isLoading} = useFetchAlbumsQuery(user);
    
   let content ;
   if(isLoading) {
    content = <Skeleton times={3}/>;
   } else if(error) {
    content = <div>Error loading albums...</div>;
   } else {
    content = data.map(album  => {
        const header =<div>{album.title}</div> 
        return <ExpandablePanel key={albumsApi.id} header={header}>
            List of photos and slbum
        </ExpandablePanel>
    })
   }
    
    return <div>
        <div>
        Albums created by {user.name}
        </div>
        <div>
            {content}
        </div>
        </div>
};

export default AlbumsList;
