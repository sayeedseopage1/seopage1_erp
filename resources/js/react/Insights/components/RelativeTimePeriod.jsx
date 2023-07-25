import { relativeDates, relativePeriod, rollingPeriod } from "../utils/constants";
import * as React from 'react';
import PropTypes from 'prop-types';
import Dropdown from "../ui/Dropdown";
import SearchBox from "../ui/Searchbox";
import TextHighlighter from "./TextHighlighter";
import _ from "lodash";


const RelativeTimePeriod = ({
    selectedPeriod,
    setSelectedPeriod,
    setApplyFilter,
    defaultPeriod
}) => {
    const [searchText, setSearchText] = React.useState('');

    // relative dates
    const filteredRelativeDates = relativeDates.filter((d) =>
        _.lowerCase(d).includes(_.lowerCase(searchText))
    );

    // relative period
    const filteredPeriod = relativePeriod.filter((p) =>
        _.lowerCase(p).includes(_.lowerCase(searchText))
    );

    // rolling period
    const filteredRollingPeriod = rollingPeriod.filter((r) =>
        _.lowerCase(r).includes(_.lowerCase(searchText))
    )


    return(
        <Dropdown>
            <Dropdown.Toggle className="cnx__relative_time">
                {selectedPeriod || 'Today'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="cnx__relative_time__menu">
                <div className="cnx__search_container">
                    <SearchBox value={searchText} autoFocus={true} onChange={setSearchText} />
                </div>
                <div className="cnx_divider" />
                <div className="cnx__relative_time__menu__list">
                {filteredRelativeDates.length > 0 && (
                    <div className="">
                       <div className="cnx__relative_time__menu__title">Relative Dates</div>

                      {filteredRelativeDates.map((d) => (
                        <Dropdown.Item key={d} onClick={() => {
                            setSelectedPeriod(d),
                            setApplyFilter(true)
                        }} className={`cnx_select_box_option cnx__relative_time__menu__item ${selectedPeriod === d? 'active' : ''}`}> 
                            <TextHighlighter
                                searchWords={searchText}
                                textToHighlight={d}
                            />
                        {selectedPeriod === d && <i className="fa-solid fa-check" />}</Dropdown.Item>
                      ))}
                    </div>
                )}


                {filteredPeriod.length > 0 && (
                    <div className="">
                       <div className="cnx__relative_time__menu__title">Relative Dates</div>

                      {filteredPeriod.map((d) => (
                        <Dropdown.Item key={d} onClick={() => {
                            setSelectedPeriod(d),
                            setApplyFilter(true)
                        }} className={`cnx_select_box_option cnx__relative_time__menu__item ${selectedPeriod === d? 'active' : ''}`}> 
                            <TextHighlighter
                                searchWords={searchText}
                                textToHighlight={d}
                            />
                        {selectedPeriod === d && <i className="fa-solid fa-check" />}</Dropdown.Item>
                      ))}
                    </div>
                )}


                {filteredRollingPeriod.length > 0 && (
                    <div className="">
                       <div className="cnx__relative_time__menu__title">Relative Dates</div>

                      {filteredRollingPeriod.map((d) => (
                        <Dropdown.Item key={d} onClick={() => {
                            setSelectedPeriod(d),
                            setApplyFilter(true)
                        }} className={`cnx_select_box_option cnx__relative_time__menu__item ${selectedPeriod === d? 'active' : ''}`}> 
                            <TextHighlighter
                                searchWords={searchText}
                                textToHighlight={d}
                            />
                        {selectedPeriod === d && <i className="fa-solid fa-check" />}</Dropdown.Item>
                      ))}
                    </div>
                )}

                <div className="">
                        <Dropdown.Item  
                        onClick={() => setApplyFilter(false)} 
                        className={`cnx_select_box_option cnx__relative_time__menu__item}`}> 
                            {defaultPeriod}
                        </Dropdown.Item>
                    </div>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
};


RelativeTimePeriod.propTypes = {
    selectedPeriod: PropTypes.string,
    setSelectedPeriod: PropTypes.func
}

export default RelativeTimePeriod;