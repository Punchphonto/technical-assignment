import { useContext } from "react"
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext"

const Register = () => {

    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext)

    return (
        <>
            <Form onSubmit={registerUser}>
                <Row className="register-row">
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h3>Register</h3>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })}
                            ></Form.Control>
                            <Form.Control
                                type="email"
                                placeholder="E-mail"
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
                            ></Form.Control>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
                            ></Form.Control>
                            <Button variant="primary" type="sunmit">
                                {isRegisterLoading ? "Creating your account" : "Register"}
                            </Button>
                            {
                                registerError?.error && <Alert variant="danger">
                                    {registerError?.message}
                                </Alert>
                            }

                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Register
