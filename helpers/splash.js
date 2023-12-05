import { Loading } from "@nextui-org/react";
import React, { useState} from "react";

export const Loadersplash = () => {
    //const [loading, setLoading] = useState(true);
    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading size="xl" loading="true" />
      </div>
    );
};