import { withAuth } from '../../../helpers/withAuth';
// import { All_User } from '../../../datatables/users/all_users.data'

const  Property_Page = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Property Management</h1> 
        {/* <All_User/>  */}
    </div>
  );
}
export default withAuth(Property_Page);
