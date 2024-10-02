import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { useAuthStore } from '../store/authStore';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {isLoading, forgotPassword} =useAuthStore();
  return (
    <div>
      forgot Password
    </div>
  )
}

export default ForgotPassword
