import React, { useState } from "react";
// import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from 'react-datepicker';
import SearchSection from "./SearchSection";

import DropdownToggle from "./DropdownToggle";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { usePage } from "../util/usePage";
import { FaEdit } from "react-icons/fa";

import { BsEye } from "react-icons/bs";
const Table = ({
  headerTable,
  data,
  dataFields,
  actions,
  selectedRows,
  handleRowSelect,
  id,
}) => {
  return (
    <div>
      <div className="mt-8 w-full overflow-x-auto sm:overflow-x-visible min-h-fit ">
        <table className="table-auto w-full">
          <thead className="rounded-md overflow-hidden">
            <tr>
              {headerTable.map((header, index) => (
                <th
                  key={index}
                  className="text-start text-sm font-medium py-3 px-2   whitespace-nowrap "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {data?.map((item, index) => {
              const identifier = item[id]; // Obtener el primer campo

              return (
                <tr
                  key={index}
                  // className="border-b border-border hover:bg-greyed transitions"
                  className={`border-b border-border hover:bg-greyed transitions  ${
                    selectedRows?.includes(identifier) ? "bg-selected" : ""
                  }`}
                  onClick={() => handleRowSelect(identifier)}
                >
                  <td className="text-start text-xs py-4  whitespace-nowrap">
                    {index}
                  </td>
                  {dataFields.map((field, idx) => (
                    <td
                      key={idx}
                      className="text-start text-xs py-4  whitespace-wrap font-medium"
                    >
                      {field === "es_fallecido" || field === "finalizado" ? (
                        <div className=" absolute w-28">
                          <input
                            type="checkbox"
                            checked={item[field]}
                            readOnly
                          />
                        </div>
                      ) : field === "hc_paciente" ? (
                        <span
                          class={`py-2 px-4 -ml-4 bg-green-500 text-subMain bg-opacity-10 text-xs rounded-xl `}
                        >
                          <a href={`/patients?hc=${item[field]}`}>
                            {item[field]}
                          </a>
                        </span>
                      ) : (
                        item[field]
                      )}
                    </td>
                  ))}

                  {actions && (
                    <td className="text-start text-xs py-3  whitespace-nowrap">
                      <DropdownToggle
                        className="dropdown"
                        icon={<BsThreeDots size={20} color="#79889c" />}
                        // items={actions.map((action) => ({
                        //   label: action.label,
                        //   url: action.url(item),
                        //   icon: action.icon,
                        // }))}
                        items={actions(item).map((action) => ({
                          label: action.label,
                          url: action.url,
                          icon: action.icon,
                        }))}
                        styles={{
                          backgroundColor: "#f7f9faff",
                          border: "1px solid #e4e6ebff",
                          padding: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "none",
                          color: "black",
                          width: "40px",
                          height: "40px",
                        }}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
