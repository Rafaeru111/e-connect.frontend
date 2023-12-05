import { withAuth } from '../../../helpers/withAuth';
import { Client_User } from '../../../datatables/users/client_user.data'

const  All_Client = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Client Management</h1> 
        <Client_User/>
    </div>
  );
}
export default withAuth(All_Client);
