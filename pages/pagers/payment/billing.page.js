import { withAuth } from '../../../helpers/withAuth';
import { Billing_Users } from '../../../datatables/billing.data';

const  Billing_Page = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Billing Management</h1> 
       <Billing_Users />
    </div>
  );
}
export default withAuth(Billing_Page);
