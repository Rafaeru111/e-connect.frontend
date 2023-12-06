import { withAuth } from '../../../helpers/withAuth';
// import { All_User } from '../../../datatables/users/all_users.data'

const  Application_Page = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Client Application's Management</h1> 
        {/* <All_User/>  */}
    </div>
  );
}
export default withAuth(Application_Page);