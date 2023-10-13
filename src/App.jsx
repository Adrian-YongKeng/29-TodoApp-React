import { Container, Navbar, Nav } from "react-bootstrap"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home"
import "bootstrap/dist/css/bootstrap.min.css"
import AddTodo from "./pages/AddTodo"
import { TodoContext } from "./contexts/TodoContext"
import useLocalStorage from "use-local-storage"
import EditTodo from "./pages/EditTodo"

function Layout() {

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/" >Todos</Navbar.Brand>
          <Nav>
            <Nav.Link href="/addtodo">Add Todo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet /> {/*{children}*/}
    </>
  )
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/addtodo" element={<AddTodo />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/edit/:id" element={<EditTodo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  )
}

