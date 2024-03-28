import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { tryVerify } from '../../api/visit.api';
import { Loading } from "@nextui-org/react";
import { checkToken } from '../../api/global.api';
import useAuthStore from "../../store/auth.store";
import useUserStore from "../../store/user.store";

const Verify_page = () => {
    //verify the page if logged
    const router = useRouter();
    const { parameter } = router.query;
    
    useEffect(() => {

        const token = localStorage.getItem('token');
    
      if (token) {
    
        checkToken(token)
          .then((checkTokenResponse) => {
            console.log(checkTokenResponse.data);
            const status = checkTokenResponse.data.status
            console.log(status);
            
            if(!status){
                Swal.fire({
                  title: 'Session Expired!',
                  text: 'Please Login Again',
                  imageUrl: 'https://media.giphy.com/media/cNNsPXZAQtc9fmQvxA/giphy.gif',
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: 'Custom image',
    
                  //action after clicking OK
                }).then((result) => {
                  if (result.isConfirmed) {
                    //remove the datas
                    localStorage.removeItem('token');
                    localStorage.removeItem('user-storage');
                    setLoggedOut();
                    router.push('/statuses_page/verifyer.login')
                  }
                })
            }
    
          })
          .catch((error) => {
            console.error('Error checking token:', error);
          });
      } else {
        console.log('Token not found in localStorage');
      }
    }, []);
   
    
    const verify = async (params) => { 
        try {
            const response = await tryVerify(params);
                if(response.status === 200){
                    router.push('/statuses_page/success.page');
                }else{
                    router.push('/statuses_page/error.page');
                }
        } catch (error) {
            router.push('/statuses_page/error.page');
        }
    } 
    

    useEffect(() => {
        if (parameter) {
            verify(parameter);
        }
      }, [parameter]);

  return (
    <div>
       
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h1>Verifying Data -  </h1> <Loading size="xl" loading="true" />
      </div>
  </div>
  )
}

export default Verify_page