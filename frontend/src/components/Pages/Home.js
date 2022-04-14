import Navbar from "../components/Navbar";
import Categories from "../components/Categories"
import Footer from "../components/Footer";


function Home() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Categories />
            </main>
            <Footer />
        </>
    );
}
export default Home;