import { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const { data } = await axios.post(endpoint, { email, password });
            
            if (isLogin) {
                // Save token to localStorage
                localStorage.setItem('token', data.token);
                setSuccess('Login successful!');
                // Here you would typically redirect to a dashboard
            } else {
                setSuccess('Registration successful! You can now login.');
                setIsLogin(true); // Switch to login after successful registration
            }
            
            // Clear form
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <>
            {/* Hidden checkbox for the glowing CSS effects based on original design */}
            <input 
                type="checkbox" 
                className="input-check" 
                id="input-check" 
                style={{ display: 'none' }}
                checked={isChecked}
                readOnly
            />
            
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <h2>{isLogin ? 'Login' : 'Register'}</h2>
                    
                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="mail"></ion-icon>
                        </span>
                        <input 
                            type="email" 
                            id="email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                        <div className="input-line"></div>
                    </div>
                    
                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="lock-closed"></ion-icon>
                        </span>
                        <input 
                            type="password" 
                            id="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                        <div className="input-line"></div>
                    </div>

                    {isLogin && (
                        <div className="remember-forgot">
                            <label>
                                <input 
                                    type="checkbox" 
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                /> Remember me
                            </label>
                            <a href="#">Forgot Password?</a>
                        </div>
                    )}

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                    
                    <div className="register-link">
                        <p>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <a onClick={toggleMode}>{isLogin ? 'Register' : 'Login'}</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AuthForm;
