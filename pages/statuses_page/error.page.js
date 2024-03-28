import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

const ErrorPage = () => {
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
        status="error"
        title="Verification Failed"
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

export default ErrorPage;
