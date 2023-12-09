import { withAuth } from '../../../helpers/withAuth';
// import { All_User } from '../../../datatables/users/all_users.data'
import { Visitor_Data } from '../../../datatables/visitation/visit.data';


const  Visitor_Page = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Visitor's Management</h1> 
        <Visitor_Data/> 
    </div>
  );
}
export default withAuth(Visitor_Page);
