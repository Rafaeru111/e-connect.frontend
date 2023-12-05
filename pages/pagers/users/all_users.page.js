import { withAuth } from '../../../helpers/withAuth';
import { All_User } from '../../../datatables/users/all_users.data'

const  All_Users = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>All Users Management</h1> 
        <All_User/> 
    </div>
  );
}
export default withAuth(All_Users);
