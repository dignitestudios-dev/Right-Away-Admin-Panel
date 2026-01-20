import { DataTable } from "./component/data-table"

import data from "./component/data.json"
 



 const Request = () => {
    return (
        <div>
  <h1 className="text-2xl font-bold p">Request</h1>
            <DataTable  users={data}   />
        </div>

    )
}

export default Request