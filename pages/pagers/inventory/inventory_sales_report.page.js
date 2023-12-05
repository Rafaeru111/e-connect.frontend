import { withAuth } from '../../../helpers/withAuth';
//import { Usertable } from '../../../datatables/usertable'

const  Inventory_Sales_Report = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Sales Report Management</h1> 
        {/* <Usertable/> */}
    </div>
  );
}
export default withAuth(Inventory_Sales_Report);