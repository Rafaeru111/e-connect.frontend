import { withAuth } from '../../../helpers/withAuth';
import { Inventory_Category_Data } from '../../../datatables/inventory/inventory_category.data'

const  Inventory_Category = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Inventory Category Management</h1> 
        <Inventory_Category_Data/>
    </div>
  );
}
export default withAuth(Inventory_Category);
