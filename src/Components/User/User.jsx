import React,{useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {AiFillDelete} from  'react-icons/ai';
import {AiFillEdit} from  'react-icons/ai';
import { Form } from 'react-bootstrap';
export default function User() {

    const [user,setUser]=useState([]);
    
    const [userId,setUserId]=useState('');
    
    const [getData,setGetData]=useState(false) ;
    
    const [showDeleteModal,setShowDeleteModal]=useState(false);
    const [showEditModal,setShowEditModal]=useState(false);

    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');



    useEffect( () => {
      async function getData1() {
       await fetch('https://faramarz22-39d23-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
        .then(response => response.json())
        .then(data => {
          setUser(Object.entries(data));
        })
      }
       getData1();
        
      },[getData])
    
    useEffect(() => {
      let mainUserInfo=user.find(user => user[0] ==userId)
      if(mainUserInfo){
        setFirstName(mainUserInfo[1].firstName)
        setLastName(mainUserInfo[1].lastName)
        setEmail(mainUserInfo[1].email)
      }
    },[userId])

    const removeHandler =async () => {
    await fetch(`https://faramarz22-39d23-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,{
      method:'DELETE',
    }).then((response) => {console.log(response)})
    setGetData(prev => !prev)
    }
  
    
    const updateData = async () => {    
      let NewData ={
        firstName,
        lastName,
        email,
      }
    await fetch(`https://faramarz22-39d23-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,{
      method:'PUT',
      body:JSON.stringify(NewData),
    }).then((response) => { console.log(response)})

    setGetData(prev => !prev)
    }

    return (
    <>
     <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {user.map((user,index) => (
        <tr key={user[0]}>
          <td>{index + 1}</td>
          <td>{user[1].firstName}</td>
          <td>{user[1].lastName}</td>
          <td>{user[1].email}</td>
          <td style={{display:'flex',justifyContent:'space-evenly'}}>            
          <AiFillDelete style={{cursor:'pointer'}}
            onClick={()=> {
            setShowDeleteModal(true);
            setUserId(user[0]);
            }}
          />
          <AiFillEdit style={{cursor:'pointer'}}
          onClick={() => {
            setShowEditModal(true);
            setUserId(user[0]);
          }} />
          </td>
        </tr>
      ))}
      </tbody>
    </Table>

    {/*Delete modal */}
    <Modal
    show={showDeleteModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Deleted Modal</h4>
        <p>
        Are You Sure to Delete user ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=> setShowDeleteModal(false)}>Close</Button>
        <Button onClick={()=> {
        removeHandler()
        setShowDeleteModal(false)
        }}>Yes Delete</Button>
      </Modal.Footer>
    </Modal>

        {/* Edit Modal */}
        <Modal
    show={showEditModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' >
              <Form.Label>FirstName : </Form.Label>
              <Form.Control type='text' placeholder={firstName} onChange={(event) => setFirstName(event.target.value)}/>
          </Form.Group>
          <Form.Group className='mb-3' >
              <Form.Label>LastName : </Form.Label>
              <Form.Control type='text' placeholder={lastName} onChange={(event) => setLastName(event.target.value)} />
          </Form.Group>
          <Form.Group className='mb-3' >
              <Form.Label>Email : </Form.Label>
              <Form.Control type='email' placeholder={email} onChange={(event) => setEmail(event.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=> setShowEditModal(false)}>Close</Button>
        <Button onClick={()=> {
            updateData()
            setShowEditModal(false)
        }}>Edit</Button>
      </Modal.Footer>
    </Modal>
        
    </>
    )
}
