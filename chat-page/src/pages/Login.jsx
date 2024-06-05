import { useContext } from "react"
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext"


const Login = () => {
    const { loginInfo, updateLoginInfo, login, loginError } = useContext(AuthContext)
    return (
        <>
            <Form onSubmit={login}>
                <Row className="register-row">
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h3>Login</h3>
                            <Form.Control
                                onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
                                type="email" placeholder="E-mail"></Form.Control>
                            <Form.Control
                                onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
                                type="password" placeholder="Password"></Form.Control>
                            <Button variant="success" type="submit">
                                Login
                            </Button>
                            {
                                loginError?.error && <Alert variant="danger">
                                    {loginError?.message}
                                </Alert>
                            }
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Login
