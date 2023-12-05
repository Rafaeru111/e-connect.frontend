import { withAuth } from '../../../helpers/withAuth';
import { Payment_Managements } from '../../../datatables/payment/payment_records.data';

const  Payment_Page = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Payment Management</h1> 
        <Payment_Managements/>
    </div>
  );
}
export default withAuth(Payment_Page);
