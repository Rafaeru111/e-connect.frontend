import { withAuth } from '../../../helpers/withAuth';
// import { All_User } from '../../../datatables/users/all_users.data'

const  Property_Type = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Property Type Management</h1> 
        {/* <All_User/>  */}
    </div>
  );
}
export default withAuth(Property_Type);
