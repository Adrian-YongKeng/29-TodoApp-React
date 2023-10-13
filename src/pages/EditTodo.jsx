import { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { TodoContext } from '../contexts/TodoContext';
import {  useParams,useNavigate } from 'react-router-dom';

export default function EditTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] =useState("");
    const [completed, setCompleted] =useState(false);
    const navigate = useNavigate();

    const setTodos = useContext(TodoContext).setTodos;
    const todos = useContext(TodoContext).todos;
    const {id} =useParams();

    useEffect(()=>{
    //  console.log(id);
    //  console.log(todos);
        const todoToEdit = todos.find((todo) => todo.id === Number(id));
        if (todoToEdit) {
            setTitle(todoToEdit.title);
            setDescription(todoToEdit.description);
            setCompleted(todoToEdit.completed);
        }
    }, [id, todos]) ;

    function handleEdit () {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                return {...todo, title, description,completed};
            }
            return todo;
        });
        setTodos(updatedTodos);
        navigate('/');
        alert("Edit Successful!")
    }

  return (
    <Container>
        <h1 className='my-3'>Edit Todo</h1>
    <Form onSubmit={handleEdit}>
    
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

 