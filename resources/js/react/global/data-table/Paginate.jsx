/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import _ from "lodash";
import React from "react";
import styles from "./table.module.css";

const Paginate = ({ perPageRow, pageIndex, total, onPageChange, onPageRowChange }) => {
  const [renderButtons, setRenderButtons] = React.useState([]);
  const _total = Math.ceil(total / perPageRow);
  const startRow = (pageIndex - 1) * perPageRow;
  let endRow = startRow + perPageRow;
  if (endRow > total) {
    endRow = total;
  }

  const handleRenderButtons = React.useCallback(() => {
    const buttons = [];
    if (_total <= 7) {
      for (let i = 1; i <= _total; i++) {
        buttons.push(i);
      }
    } else {
      if (pageIndex <= 3) {
        for (let i = 1; i < 5; i++) {
          buttons.push(i);
        }
      } else if (pageIndex >= _total - 3) {
        for (let i = _total - 4; i <= _total; i++) {
          buttons.push(i);
        }
      } else if (pageIndex > 3 && pageIndex < _total - 3) {
        for (let i = pageIndex - 2; i <= pageIndex + 2; i++) {
          buttons.push(i);
        }
      }
    }
    setRenderButtons([...buttons]);
  }, [pageIndex, _total]);

  // create render buttons
  React.useEffect(() => {
    handleRenderButtons();
    return () => {
      setRenderButtons([]);
    };
  }, [pageIndex, _total]);

  return (
    <div className={styles.sp1_table__pagination}>
      <div className={styles.table_pagiantion__dd}>
        Show
        <select value={perPageRow} onChange={(e) => onPageRowChange(Number(e.target.value))}>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
        </select>
        entries
      </div>
      <div className={styles.table_pagiantion__info}>
        <span>
          Showing {startRow + 1} to {endRow} of {total} entries
        </span>
        <div className={styles.table_pagiantion__button_group}>
          <Button pageIndex={pageIndex} onClick={() => onPageChange(pageIndex > 1 ? pageIndex - 1 : 1)}>
            Previous
          </Button>
          {renderButtons[0] > 1 && (
            <>
              <Button key={1} index={1} pageIndex={pageIndex} onClick={() => onPageChange(1)}>
                1
              </Button>
              <Button> ...</Button>
            </>
          )}

          {_.map(renderButtons, (btn) => (
            <Button key={btn} index={btn} pageIndex={pageIndex} onClick={() => onPageChange(btn)}>
              {btn}
            </Button>
          ))}

          {
            // render dots
            renderButtons[renderButtons.length - 1] < _total - 1 && (
              <>
                <Button> ...</Button>
                <Button index={_total} pageIndex={pageIndex} onClick={() => onPageChange(_total)}>
                  {_total}
                </Button>
              </>
            )
          }
          <Button pageIndex={pageIndex} onClick={() => onPageChange(pageIndex < _total ? pageIndex + 1 : 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Paginate;

const Button = ({ className, pageIndex, onClick, ...props }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
                ${styles.table_pagiantion__button} 
                ${pageIndex === Number(props.index) ? styles.active : ""} 
                ${className}`}
      {...props}
    />
  );
};
