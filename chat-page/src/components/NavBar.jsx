import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {

    const { user, logout } = useContext(AuthContext)
    return <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
        <Container>
            <h3>
                <Link to="/" className="link-light text-decoration-none">Realtime-Chat</Link>
            </h3>
            {user && <span className="text-warning">Welcome {user?.name}</span>}
            <Nav>
                <Stack direction="horizontal" gap={3}>
                    {
                        user && (<>
                            <Link
                                onClick={() => logout()} to="/login" className="link-light text-decoration-none btn btn-danger">Logout</Link>
                        </>)
                    }

                    {!user && (<>
                        <Link to="/login" className="link-light text-decoration-none">Login</Link>
                        <Link to="/register" className="link-light text-decoration-none">Register</Link>
                    </>)}
                </Stack>
            </Nav>
        </Container>
    </Navbar>
}

export default NavBar
