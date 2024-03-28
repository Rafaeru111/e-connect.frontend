import React, { useEffect} from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { checkToken } from '../../api/global.api';
import useAuthStore from "../../store/auth.store";
import useUserStore from "../../store/user.store";
import { useRouter } from 'next/router';

const WellDone = () => {
    const router = useRouter();

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
        router.push('/statuses_page/verifyer.login')
      }
    }, []);

  return (
    <Result
      icon={<SmileOutlined />}
      title="Great, we have done. Close the page and Scan QR Again!"
    />
    
  );
};

export default WellDone;
