import Grid from '@mui/material/Grid';
import { Box, Button, FormControl, Modal, OutlinedInput, Typography } from '@mui/material';
import React, { useState } from 'react';
import { authorizeUser, changePassword } from '../utils/authorization';
import { useNavigate } from 'react-router-dom';

/**
 * ログイン画面
 */
const Login = () => {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [modalShow, isModalShow] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    /**
     * ログイン
     */
    const loginUser = async () => {
        // ② cognitoログイン処理の呼び出し
        // await authorizeUser(loginId, password, () => { navigate("/payment") },
        //     () => { alert("invalid id/password") }, () => { isModalShow(true) });

    }

    /**
     * 初回ログイン時はパスワード変更する
     */
    const changeUserPassword = async () => {
        await changePassword(password, newPassword, () => { navigate("/payment") });
    }

    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Box>
                    <Typography variant="h4" gutterBottom component="div">Please Login your account</Typography>

                    <Grid container rowSpacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <OutlinedInput id="loginId" value={loginId} placeholder="id" onChange={e => setLoginId(e.target.value)} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <OutlinedInput id="password" type="password" value={password} placeholder="password" onChange={e => setPassword(e.target.value)} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Button variant="contained" fullWidth={true} id="loginButton" onClick={loginUser}>Login</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            {/* modal */}
            <Modal
                open={modalShow}
                onClose={() => isModalShow(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal">
                    <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                        please change your password
                    </Typography>
                    <Grid container rowSpacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <OutlinedInput type="password" value={newPassword} placeholder="new password" onChange={e => setNewPassword(e.target.value)} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained"
                                onClick={() => {
                                    changeUserPassword();
                                    isModalShow(false);
                                }}>
                                change password
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    );
}

export default Login;
