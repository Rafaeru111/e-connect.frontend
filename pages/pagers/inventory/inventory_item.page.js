import { withAuth } from '../../../helpers/withAuth';
import {Inventory_Item_Data} from '../../../datatables/inventory/inventory_item.data'

const  Inventory_Item = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Inventory Item Management</h1> 
        <Inventory_Item_Data/>
    </div>
  );
}
export default withAuth(Inventory_Item);