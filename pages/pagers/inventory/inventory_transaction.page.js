import { withAuth } from '../../../helpers/withAuth';
import { Inventory_Transaction_Data } from '../../../datatables/inventory/inventory_transaction.data';

const  Inventory_Transaction = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Inventory Transaction Management</h1> 
        <Inventory_Transaction_Data/>
    </div>
  );
}
export default withAuth(Inventory_Transaction);