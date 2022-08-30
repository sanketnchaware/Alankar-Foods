export const Customers = (props) => {
  console.log(props.data, "values of feedback");

  
  return (
    <div>
      <h1 className=" text-2xl font-bold text-darkyellow my-6 ">Customers</h1>
      <div className=" text-center bg-white p-6 my-4 rounded-xl pt-2  ">
        {props.data.feedback.length > 0 ? (
          <table className=" table-auto w-full border-collapse">
            <thead>
              <tr className="border-b-2  tableBorder ">
                {props.data.orderMenu.map((e, index) => (
                  <th key={index} className="">
                    <p className=" mb-2">{e}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.data.feedback.length > 0 ? (
                props.data.feedback.map((e, index) => (
                  <tr key={index} className="tableBorder">
                    <td>
                      <p className=" mt-7 mb-7 font-medium">{index + 1}</p>
                    </td>
                    <td>
                      <p className=" mb-7 mt-7 font-medium">{e.customername}</p>
                    </td>
                    <td>
                      <p className=" mb-7 mt-7 font-medium">#{e.id}</p>
                    </td>
                    <td>
                      <p className=" mb-7 mt-7 font-medium">+91 {e.phone}</p>
                    </td>
                    <td>
                      <p className=" mb-7 mt-7 font-medium">{e.waiter}</p>
                    </td>
                    <td>
                      <p className=" mb-7 mt-7 font-medium">{e.rating}</p>
                    </td>
                    <td>
                      <p className=" mb-7 mt-7 font-medium">{e.comment}</p>
                    </td>
                  </tr>
                ))
              ) : (
                <span className="flex justify-center">No Data Found</span>
              )}
            </tbody>
          </table>
        ) : (
          <span className="flex justify-center font-semibold text-2xl">No Data Found!</span>
        )}
      </div>
    </div>
  );
};
