import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

const Success_Page = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  const goBack=()=>{
    router.push('/statuses_page/well_done.page');
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/statuses_page/well_done.page');
    }
  }, [countdown]);

  return (
    <>
      <Result
       status="success"
        title="Successfully Verified the Visitation"
        subTitle={`Please check, you will be redirected in ${countdown} seconds`}
        extra={[
          <Button type="primary" key="console" onClick={goBack}>
            Go Console
          </Button>,
        ]}
      />
    </>
  );
};

export default Success_Page;
