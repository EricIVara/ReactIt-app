import Navbar from "../components/Navbar";
import Posts from '../components/Posts';
import { useLocation } from 'react-router-dom'
function PostsPage(){
    //props.location.state
    const location = useLocation();
    console.log(location.state)
    console.log("####################################")
    return (
        <>
        <Navbar />
        <Posts {...location.state}/>
        </>
    )
}
export default PostsPage;