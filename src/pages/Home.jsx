import { useContext } from "react";
import { Badge, Card, Container, Row, Col, Button } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { Link } from "react-router-dom";

export default function Home() {
    const todos = useContext(TodoContext).todos;
    const setTodos = useContext(TodoContext).setTodos;
//const { todos, setTodos } = useContext(TodoContext);
    function handleDelete(id) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos)
    }

    return (
        <Container>
            <h1 className="my-3">Your todos</h1>
            <Row>
                <CardGroup todos={todos} handleDelete={handleDelete} />
            </Row>
        </Container>
    );
}

function CardGroup({todos, handleDelete}) {
    return todos.map((todo) => {
        const completed = todo.completed;
        const bg = completed ? "success" : "danger";
        return (
        <Col md={4} key={todo.id}>
          <Card className="my-3 ">
            <Card.Body>
              <Card.Title>{todo.title}</Card.Title>
              <Card.Text>{todo.description}</Card.Text>
              <Badge bg={bg}> {!completed && "Not"} Completed</Badge>
              <div className="mt-5">
              <Button className='me-2' variant="danger" onClick={() => handleDelete(todo.id)}>
                Delete
                </Button>
                <Button variant="warning">
                    <Link className="text" to={`/edit/${todo.id}`} style={{ color:"white" ,textDecoration: 'none' }}>
                        Edit
                    </Link>
                </Button>
                </div>
            </Card.Body>
          </Card>
        </Col>
      );
    })
  }