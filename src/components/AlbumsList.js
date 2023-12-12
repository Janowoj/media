import {useFetchAlbumsQuery} from '../store';

function AlbumsList({ user }) {
    const { data, error, isLoading } = useFetchAlbumsQuery(user);
    
    console.log(data, error, isLoading);
    
    return <div>Albums created by {user.name}</div>
};

export default AlbumsList;