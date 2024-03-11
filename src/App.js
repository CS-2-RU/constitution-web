import Router from "./components/Router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeftMenu from "./components/LeftMenu";

const App = () => {
    return (
        <>
            <Header />
            <main>
                <LeftMenu />
                <div className="content">
                    <Router />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default App;
