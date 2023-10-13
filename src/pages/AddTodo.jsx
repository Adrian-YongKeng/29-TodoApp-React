import { useContext, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { TodoContext } from '../contexts/TodoContext';
import { useNavigate } from 'react-router-dom';

export default function AddTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] =useState("");
    const [completed, setCompleted] =useState(false);
    const setTodos = useContext(TodoContext).setTodos;
    const todos = useContext(TodoContext).todos;
    const navigate =useNavigate();

  return (
    <Container>
        <h1 className='my-3'>Add Todo</h1>
    <Form 
        onSubmit={(event) => {
            event.preventDefault();
            setTodos ([
                ...todos,
                {id: Date.now(), title, description, completed},
            ])
            navigate('/');
        }}
    >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control 
            type="text" 
            placeholder="Get software developer job"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control 
            as="textarea" 
            rows={3} //initial state 3rows
            value={description}
            placeholder={`1. Create amazing project\n2. Apply to Google & Netflix\n3. Crush interview`}
            onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check 
            type="checkbox" 
            //id='completed'
            label="Mark as completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
         />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
  );
}

 