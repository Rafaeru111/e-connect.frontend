import { withAuth } from '../../../helpers/withAuth';
//import { Usertable } from '../../../datatables/usertable'

const  Inventory_Transaction_Item = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Inventory Transaction Items Management</h1> 
        {/* <Usertable/> */}
    </div>
  );
}
export default withAuth(Inventory_Transaction_Item);