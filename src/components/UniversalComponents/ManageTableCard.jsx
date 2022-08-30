import React from 'react'

const ManageTableCard = (props) => {
    console.log(props.data,"value from manage table");
  return (
    <div>
      <div className=" box h-56 mb-16 lg:mb-1">
              <div className="h-16 bg-orange rounded-t-lg pt-4 flex flex-row justify-between pl-2 pr-2">
                <div className="text-white mt-1 font-sans font-semibold text-left">
                  Table: {props.data.data.table?.name}
                </div>
                <div className="text-white font-sans font-semibold mt-1">
                  Waiter:{props.data.data.table?.users[0]?.name}
                </div>
              </div>
              <div className="h-48 flex flex-col gap-3 bg-white pt-2 pl-2 pr-2">
                <div className="flex flex-row gap-1">
                  <div className="w-3/6 text-left font-semibold">Status:</div>
                  <div className="w-3/6 text-left">Occupied</div>
                </div>
                <div className="flex flex-row gap-1">
                  <div className="w-3/6 text-left font-semibold">Members:</div>
                  <div className="w-3/6 text-left">{props.data.data.total_persons}</div>
                </div>
                <div className="flex flex-row gap-1">
                  <div className="w-3/6 text-left font-semibold">
                    Order Status:
                  </div>
                  <div className="w-3/6 text-left">
                    {props.data.data.payment_status === "INPROGRESS" ? (
                      <div className="text-green-600 font-sans font-semibold">
                        In Progress
                      </div>
                    ) : (
                      <div className="text-orange font-sans font-semibold">
                        Payment Pending
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-1">
                  <div className="w-3/6 text-left font-sans font-semibold">
                    Payment Status:
                  </div>
                  <div className="w-3/6 text-left">
                    {props.data.data.payment_status === "INPROGRESS" ? (
                      <div className="text-red-500 font-sans font-semibold">
                        Bill not generated
                      </div>
                    ) : (
                      <div className="text-green-600 font-sans font-semibold">
                        Bill generated
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="h-10 add text-center font-sans font-semibold pt-2 text-white rounded-lg cursor-pointer"
                onClick={() => {
                  props.data.onClick(props.data.data.id);
                }}
              >
                View
              </div>
            </div>
    </div>
  )
}

export default ManageTableCard
