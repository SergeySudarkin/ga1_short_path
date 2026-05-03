import { Header } from "./components/Header/Header"
import { Program } from "./components/Program/Program"
import { Footer } from "./components/Footer/Footer"

function App() {
    return (
        <>
            <Header>GA1 Поиск кратчайшего пути</Header>
            <main>
                <Program />
            </main>
            <Footer />
        </>
    )
}

export default App
