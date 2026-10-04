import React from 'react';
import { Suspense } from 'react';
import ResetPasswordForm from './reset-password-form';

const ResetPasswordPage = () => {
     return (
          <div>
               <h1>Reset Password</h1>
               <Suspense fallback={<div>Loading...</div>}>
                    <ResetPasswordForm />
               </Suspense>
               
          </div>
     );
};

export default ResetPasswordPage;