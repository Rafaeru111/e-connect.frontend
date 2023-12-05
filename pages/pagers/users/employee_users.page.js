import { withAuth } from '../../../helpers/withAuth';
import { Employee_User } from '../../../datatables/users/employee_users.data';

const  All_Employee = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Employee Management</h1> 
        <Employee_User/>
    </div>
  );
}
export default withAuth(All_Employee);
