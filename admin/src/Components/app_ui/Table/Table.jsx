import React, { useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
  useSortBy,
} from "react-table";
import classnames from "classnames";

import GlobalFilter from "./GlobalFilter";

import { Button } from "../../common";

const Table = (props) => {
  let COLUMNS = props.COLUMNS;
  let DATA = props.DATA;
  let LOADING = props.LOADING;
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="space-y-5">
      {props.NOT_SEARCHABLE ? (
        <></>
      ) : (
        <>
          {props.HAS_BTN ? (
            <div className="w-full inline-flex items-center gap-5">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
              <Button
                className="bg-blue-600 text-white w-[20rem] ... rounded"
                type="button"
                label={props.BTN_LABEL}
                onClick={props.ONCLICK}
              />
            </div>
          ) : (
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          )}
        </>
      )}

      <table className="w-full text-sm text-left" {...getTableProps()}>
        <thead
          className={classnames(
            props.NEGATIVE
              ? "bg-red-900 text-white text-xs uppercase"
              : "bg-blue-900 text-white text-xs uppercase"
          )}
        >
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  scope="col"
                  className="px-6 py-3 truncate"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " (Descending)"
                        : " (Ascending)"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr className="bg-slate-100 border-b" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={classnames(
                        "px-6 py-4 truncate",
                        LOADING ? "blur-sm rounded-lg animate-pulse" : ""
                      )}
                      {...cell.getCellProps()}
                    >
                      {/* if(every 3 cell) */}
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {props.REMOVE_PAGE_CONTROL ? (
        <></>
      ) : (
        <div className="p-4 ... flex flex-row items-center gap-5">
          <div className="break-words">
            <span>Page: </span>
            <span className="font-bold">
              {pageIndex + 1} of {pageOptions.length}
            </span>
          </div>

          <div className="w-fit px-2 inline-flex items-center border-2 rounded-full border-gray-300 bg-white focus-within:border-blue-800">
            <input
              className="w-fit p-1.5 font-bold rounded-full focus:outline-none"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
            />
          </div>

          {/* <div className="w-fit px-2 inline-flex items-center border-2 rounded-full border-gray-300 bg-white focus-within:border-blue-800">
                <select
                  className="w-fit p-1.5 font-bold rounded-full cursor-pointer focus:outline-none"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[5, 10, 25, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div> */}

          <div className="ml-auto grid grid-cols-4 items-center gap-5">
            <button
              className="bg-slate-100 py-0.5 px-3 ... border-2 rounded-full hover:bg-slate-50"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>
            <button
              className="bg-slate-100 py-0.5 px-3 ... border-2 rounded-full hover:bg-slate-50"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </button>
            <button
              className="bg-slate-100 py-0.5 px-3 ... border-2 rounded-full hover:bg-slate-50"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
            <button
              className="bg-slate-100 py-0.5 px-3 ... border-2 rounded-full hover:bg-slate-50"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
