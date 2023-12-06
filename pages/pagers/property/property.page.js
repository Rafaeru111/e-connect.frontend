import { withAuth } from '../../../helpers/withAuth';
import { Property_Data } from '../../../datatables/property/property.data';

const  Property_Page = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Property Management</h1> 
        <Property_Data/> 
    </div>
  );
}
export default withAuth(Property_Page);
