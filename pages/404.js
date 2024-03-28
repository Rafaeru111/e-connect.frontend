import React from 'react';
import { Button, Result } from 'antd';

const Custom404 = () => {
  const goBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={goBack}>Go Back</Button>}
    />
  );
};

export default Custom404;
