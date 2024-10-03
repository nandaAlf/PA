import { Button, Table, Modal, Form } from "react-bootstrap";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Llama a la API para obtener todos los usuarios
    // axios
    //   .get("/api/users/")
    //   .then((response) => setUsers(response.data))
    //   .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Manejar abrir modal
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Manejar cerrar modal
  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  // Guardar cambios de usuario
  const handleSaveChanges = () => {
    axios
      .put(`/api/users/${selectedUser.id}/`, selectedUser)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === response.data.id ? response.data : user
          )
        );
        handleCloseModal();
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  // Manejar cambios en los inputs del formulario de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  // Eliminar usuario
  const handleDeleteUser = (id) => {
    axios
      .delete(`/api/users/${id}/`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="container mt-5">
      <h2>Admin Panel - Usuarios</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Departamento</th>
            <th>Título</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.dpto || "N/A"}</td>
              <td>{user.titulo || "N/A"}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditUser(user)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Editar Usuario */}
      {selectedUser && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={selectedUser.first_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={selectedUser.last_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Departamento</Form.Label>
                <Form.Control
                  type="text"
                  name="dpto"
                  value={selectedUser.dpto || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="titulo"
                  value={selectedUser.titulo || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

// export default AdminPanel;