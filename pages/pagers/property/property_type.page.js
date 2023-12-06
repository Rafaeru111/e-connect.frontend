import { withAuth } from '../../../helpers/withAuth';
import { Property_Type_Data } from '../../../datatables/property/property_type.data';

const  Property_Type = () => {
  return (
    <div style={{background:"white", padding:20, borderRadius:20}}>
        <h1>Property Type Management</h1> 
        <Property_Type_Data/> 
    </div>
  );
}
export default withAuth(Property_Type);
