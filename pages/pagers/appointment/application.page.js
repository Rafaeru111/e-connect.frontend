import { withAuth } from '../../../helpers/withAuth';
// import { All_User } from '../../../datatables/users/all_users.data'
import { Client_Application } from '../../../datatables/application/client_application.data';
const  Application_Page = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Client Application's Management</h1> 
        <Client_Application/> 
    </div>
  );
}
export default withAuth(Application_Page);