import { withAuth } from '../../../helpers/withAuth';
// import { All_User } from '../../../datatables/users/all_users.data'

const  Visitor_Page = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Visitor's Management</h1> 
        {/* <All_User/>  */}
    </div>
  );
}
export default withAuth(Visitor_Page);
