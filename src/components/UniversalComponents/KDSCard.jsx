import React from 'react'
const to12Hours = require("to12hours");


const KDSCard = (props) => {
    console.log(props.data.item,"kds");
  return (
    <div>
      <div className="box h-72 rounded-lg">
              <div className="h-2/6 bg-orange grid grid-rows-2 grid-flow-col pl-2 pr-2 pt-2 rounded-t-lg text-white font-sans font-semibold text-base">
                <div className="text-left">Table: {props.data.item.table?.name}</div>
                <div className="text-left">Guests: {props.data.item.total_persons}</div>
                <div className="text-center">Floor: {props.data.item.table?.floor}</div>
                <div className="text-center">Hall: {props.data.item.table?.hall}</div>
                <div className="text-right">
                  
                  {to12Hours(props.data.item?.created_at?.slice(11, 16))}
                </div>
                <div className="text-right">
                  {props.data.item.table?.users[0]?.role?.name}
                  {props.data.item.table?.users[0]?.name}
                </div>
              </div>
              <div className="h-3/6 overflow-y-scroll">
                {props.data.item.meta_order?.map((ele, index) => (
                  <div
                    className="flex gap-2 pl-3 justify-between pr-3 mt-1 flex-row"
                    key={index + 1}
                  >
                    {ele?.menus === null ? (
                      ""
                    ) : (
                      <>
                        <div className="pt-2">{index + 1}.</div>
                        <div className="pt-2">{ele?.menus?.name}</div>
                        <div className="pt-2">x {ele?.quantity}</div>
                      </>
                    )}

                    <div>
                      {ele?.menus === null ? (
                        ""
                      ) : (
                        <>
                          {ele?.status === 1 ? (
                            <div>
                              <button
                                onClick={() => {
                                  props.data.handleClick(ele?.id, ele?.status);
                                }}
                                className="border-2 border-button_border rounded-2xl bg-orange text-white pl-2 pr-2"
                              >
                                start
                              </button>
                            </div>
                          ) : (
                            <div>
                              {ele?.status === 2 ? (
                                <div>
                                  <button
                                    className="border-2 border-button_border  rounded-2xl pl-2 pr-2 bg-green-600 text-white"
                                    onClick={() => {
                                      props.data.handleClick(ele?.id, ele?.status);
                                    }}
                                  >
                                    Cooking
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  {ele.status === 3 ? (
                                    <div>
                                      <button
                                        className="border-2 border-button_border  rounded-2xl pl-2 pr-2 bg-green-600 text-white"
                                        onClick={() => {
                                         props.data.handleClick(ele?.id, ele?.status);
                                        }}
                                      >
                                        Ready to serve
                                      </button>
                                    </div>
                                  ) : (
                                    <div>
                                      <button className="border-2 border-button_border  rounded-2xl pl-2 pr-2 bg-green-600 text-white">
                                        Served
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-1/6 bg-orange flex flex-row justify-between pl-4 pr-4 py-3 text-white text-base font-semibold  rounded-b-lg">
                <div>#{props.data.item.id}</div>
                <div>
                  {props.data.item.order_type === "1" ? (
                    <div>Dine-In</div>
                  ) : (
                    <div>
                      {props.data.item.order_type === "2" ? (
                        <div>Take-away</div>
                      ) : (
                        <div>Party-order</div>
                      )}
                    </div>
                  )}
                </div>
                <div></div>
              </div>
            </div>
    </div>
  )
}

export default KDSCard
