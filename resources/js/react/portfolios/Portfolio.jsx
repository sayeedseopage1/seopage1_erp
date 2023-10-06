import React, { useState, useEffect } from 'react';
import Dropdown from '../global/Dropdown';
import './portfolio.css';
import PortfolioItem from './PortfolioItem';
import { useGetPortfolioFilterMenuItemsQuery, useLazyGetPortfolioDataQuery } from '../services/api/portfolioApiSlice';
import SearchBox from '../global/Searchbox';
import _ from 'lodash';
import Pagination from './components/Pagination';
import { Placeholder } from '../global/Placeholder';

 

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null); 
  const [cms, setCms] = useState(null);
  const [cmsSearch, setCmsSearch] = useState(''); 
  const [websiteType, setWebsiteType] = useState(null);
  const [websiteTypeSearch, setWebsiteTypeSearch] = useState(""); 
  const [websiteCategory, setWebsiteCategory] = useState(null);
  const [websiteCategorySearch, setWebsiteCategorySearch] = useState(""); 
  const [subCategory, setSubCategory] = useState(null);
  const [subCategorySearch, setSubCategorySearch] = useState(""); 
  const [theme, setTheme] = useState(null);
  const [themeSearch, setThemeSearch] = useState(""); 
  const [plugin, setPlugin] = useState(null);
  const [pluginSearch, setPluginSearch] = useState(""); 
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(30);

//   filter bar data
  const {data: filterMenuItems, isFetching: filterMenuIsLoading} = useGetPortfolioFilterMenuItemsQuery(); 

//   memorize filter data to avoid re-render
  const  _cms = React.useMemo(() => cms, [cms]);
  const  _webtype = React.useMemo(() => websiteType, [websiteType]);
  const  _webCategory = React.useMemo(() => websiteCategory, [websiteCategory]);
  const  _webSubCategory = React.useMemo(() => subCategory, [subCategory]);
  const  _theme = React.useMemo(() => theme, [theme]);
  const  _plugin = React.useMemo(() => plugin, [plugin]);
  const _pageIndex = React.useMemo(() => pageIndex, [pageIndex]);
  const _pageSize = React.useMemo(() => pageSize, [pageSize]);
 

  const [getPortfolioData, {isFetching: dataLoading}] = useLazyGetPortfolioDataQuery();
  
  useEffect(() => { 
    const query = {
        page: _pageIndex,
        page_size: _pageSize,
        cms: _cms?.id, 
        website_category: _webCategory?.id,
        website_type: _webtype?.id,
        website_sub_category: _webSubCategory?.id, 
        theme_name: _theme?.theme_name,
        theme_id: _theme?.id,
        plugin_name: _plugin?.plugin_name,
        plugin_id: _plugin?.id, 
    }

    const queryObject = _.pickBy(query, Boolean);
    const queryString = new URLSearchParams(queryObject).toString(); 
 
    (async() => {
        const res = await getPortfolioData(`?${queryString}`).unwrap();
        setPortfolio(res)
    })()

  }, [_cms, _webCategory,_webtype,_webSubCategory, _theme, _plugin, _pageSize, _pageIndex])
 

  const subNiches = () => {
        let data = _.filter(filterMenuItems?.website_categories, d => d.parent_category_id);
        data = _.filter(data, d => _.lowerCase(d.category_name).includes(_.lowerCase(subCategorySearch)));

        if(websiteCategory && websiteCategory.id){
            data = _.filter(data, d => d.parent_category_id === websiteCategory.id);
        }

        return data;
  }
 

  const filterThemes = () => {
    let data =  _.filter(filterMenuItems?.website_themes, f => f?.theme_name?.toLowerCase() !== 'n/a');
    if(themeSearch) {
        data = _.filter(filterMenuItems?.website_themes, q => _.lowerCase(q.theme_name).includes(_.lowerCase(themeSearch)))
    }
    return data;
  }

  const filterPlugin = () => {
    let data =  _.filter(filterMenuItems?.website_plugins, f => f?.plugin_name?.toLowerCase() !== 'n/a');
    if(pluginSearch) {
        data = _.filter(filterMenuItems?.website_plugins, q => _.lowerCase(q.plugin_name).includes(_.lowerCase(pluginSearch)))
    }
    return data;
  }
  
    return(
        <section className='p-4'>
            {/* filter bar */}
            <div className='row'>   
                
                {/* CMS Category */}
                <div className="col-12 col-sm-4 col-md-3 col-xl-2 px-2 mb-2">
                    <Dropdown>
                        <div> 
                            <label htmlFor="">Website CMS</label>
                            <Dropdown.Toggle className="portfolio-filter-dd-toggle">
                                <span className='singleline-ellipsis'>{cms?.cms_name ?? "--"}</span>
                            </Dropdown.Toggle>
                        </div>

                        <Dropdown.Menu placement='bottom' className="">
                            <div className='portfolio-filter-search-box'>
                                <SearchBox value={cmsSearch} onChange={setCmsSearch} autoFocus={true} />
                            </div>
                            <div className='portfolio-filter-dd-menu'>
                                {_.map(
                                    _.filter(filterMenuItems?.project_cms, q => 
                                        _.lowerCase(q.cms_name).includes(_.lowerCase(cmsSearch))
                                ), option => (
                                    <abbr key={option.id} title={option.cms_name}>
                                    <Dropdown.Item className="d-flex items-center justify-content-between" onClick={()=>{setCms(option), setCmsSearch('')}}>
                                        <span className='singleline-ellipsis' style={{width: '90%'}}>{ option.cms_name }</span>
                                        {cms?.id === option.id && <i className='fa-solid fa-check ' />}
                                    </Dropdown.Item>
                                    </abbr> 
                                ))}
                            </div>
                        </Dropdown.Menu> 
                    </Dropdown>
                </div> 


                {/* Website type */}
                <div className="col-12 col-sm-4 col-md-3 col-xl-2 px-2 mb-2">
                    <Dropdown>
                        <div>
                            <label htmlFor="">Website Type</label>
                            <Dropdown.Toggle className="portfolio-filter-dd-toggle">
                                <span className='singleline-ellipsis'>{websiteType?.website_type ?? "--"}</span>
                            </Dropdown.Toggle>
                        </div>

                        <Dropdown.Menu placement='bottom' className="postion-relative">
                            <div className='portfolio-filter-search-box'>
                                <SearchBox value={websiteTypeSearch} onChange={setWebsiteTypeSearch} autoFocus={true} />
                            </div>
                            <div className='portfolio-filter-dd-menu'>
                                {_.map(
                                    _.filter(filterMenuItems?.website_types, q => 
                                        _.lowerCase(q.website_type).includes(_.lowerCase(websiteTypeSearch))
                                ), option => (
                                    <abbr title={option.website_type} key={option.id}>
                                        <Dropdown.Item className="d-flex items-center justify-content-between" onClick={()=>{setWebsiteType(option),setWebsiteTypeSearch('') }}>
                                            <span className='multiline-ellipsis' style={{width: '90%'}}>{ option.website_type }</span>
                                            {websiteType?.id === option.id && <i className='fa-solid fa-check' />}
                                        </Dropdown.Item>
                                    </abbr>
                                ))}
                            </div>
                        </Dropdown.Menu> 
                    </Dropdown>
                </div>

                
                {/* Niche Category */}
                <div className="col-12 col-sm-4 col-md-3 col-xl-2 px-2 mb-2">
                    <Dropdown>
                        <div>
                            <label htmlFor="">Niche Category</label>
                            <Dropdown.Toggle className="portfolio-filter-dd-toggle">
                                <span className='singleline-ellipsis'>{websiteCategory?.category_name ?? "--"}</span>
                            </Dropdown.Toggle>
                        </div>

                        <Dropdown.Menu placement='bottom' className="">
                            <div className='portfolio-filter-search-box'>
                                <SearchBox value={websiteCategorySearch} onChange={setWebsiteCategorySearch} autoFocus={true} />
                            </div>
                            <div className='portfolio-filter-dd-menu'>
                                {_.map(
                                    _.filter(filterMenuItems?.website_categories, q => 
                                        !q.parent_category_id && 
                                        _.lowerCase(q.category_name).includes(_.lowerCase(websiteCategorySearch) 
                                        
                                    )
                                ), option => (
                                    <abbr title={option.category_name} key={option.id}>
                                        <Dropdown.Item className="d-flex items-center justify-content-between" onClick={()=>{setWebsiteCategory(option), setWebsiteCategorySearch('')}}>
                                            <span className='singleline-ellipsis' style={{width: '90%'}}>{ option.category_name }</span>
                                            {websiteCategory?.id === option.id && <i className='fa-solid fa-check ' />}
                                        </Dropdown.Item>
                                    </abbr>
                                ))}
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
 

                {/* Sub Niche Category */}
                <div className="col-12 col-sm-4 col-md-3 col-xl-2 px-2 mb-2">
                    <Dropdown>
                        <div>
                            <label htmlFor="">Sub Niche Category</label>
                            <Dropdown.Toggle className="portfolio-filter-dd-toggle">
                                <span className='singleline-ellipsis'>{subCategory?.category_name ?? "--"}</span>
                            </Dropdown.Toggle>
                        </div>

                        <Dropdown.Menu placement='bottom' className="">
                            <div className='portfolio-filter-search-box'>
                                <SearchBox value={subCategorySearch} onChange={setSubCategorySearch} autoFocus={true} />
                            </div>
                            <div className='portfolio-filter-dd-menu'>
                                {_.map(subNiches(), option => (
                                    <abbr title={option.category_name} key={option.id}>
                                        <Dropdown.Item className="d-flex items-center justify-content-between" onClick={()=>{setSubCategory(option),setSubCategorySearch('') }}>
                                        <span className='singleline-ellipsis' style={{width: '90%'}}>{ option.category_name }</span>
                                        {subCategory?.id === option.id && <i className='fa-solid fa-check ml-' />}
                                    </Dropdown.Item>
                                    </abbr>
                                ))}
                            </div>
                        </Dropdown.Menu>
                        
                    </Dropdown>
                </div>


                {/* Website Theme */}
                <div className="col-12 col-sm-4 col-md-3 col-xl-2 px-2 mb-2">
                    <Dropdown>
                        <div>
                            <label htmlFor="">Theme</label>
                            <Dropdown.Toggle className="portfolio-filter-dd-toggle">
                                <span className='singleline-ellipsis'>{theme?.theme_name ?? "--"}</span>
                            </Dropdown.Toggle>
                        </div>

                        <Dropdown.Menu placement='bottom' className="">
                            <div className='portfolio-filter-search-box'>
                                <SearchBox value={themeSearch} onChange={setThemeSearch} autoFocus={true} />
                            </div>
                            <div className='portfolio-filter-dd-menu'>
                                
                                {_.map(filterThemes(), option => (
                                    <abbr title={option.theme_name} key={option.id}>
                                        <Dropdown.Item className="d-flex items-center justify-content-between" onClick={()=>setTheme(option)}>
                                            <span className='singleline-ellipsis' style={{width: '90%'}}>{ option.theme_name }</span>
                                            {theme?.id === option.id && <i className='fa-solid fa-check ml-' />}
                                        </Dropdown.Item>
                                    </abbr>
                                ))}
                            </div>
                        </Dropdown.Menu>
                        
                    </Dropdown>
                </div>

                {/* Website Plugin */}
                <div className="col-12 col-sm-4 col-md-3 col-xl-2 px-2 mb-2">
                    <Dropdown>
                        <div>
                            <label htmlFor="">Plugin</label>
                            <Dropdown.Toggle className="portfolio-filter-dd-toggle">
                                <span className='singleline-ellipsis'>{plugin?.plugin_name ?? "--"}</span>
                            </Dropdown.Toggle>
                        </div>

                        <Dropdown.Menu placement='bottom' className="">
                            <div className='portfolio-filter-search-box'>
                                <SearchBox value={pluginSearch} onChange={setPluginSearch} autoFocus={true} />
                            </div>
                            <div className='portfolio-filter-dd-menu'>
                                {_.map(filterPlugin(), option => (
                                    <abbr title={option.plugin_name} key={option.id}>
                                        <Dropdown.Item className="d-flex items-center justify-content-between" onClick={()=>setPlugin(option)}>
                                            <span className='singleline-ellipsis' style={{width: '90%'}}>{ option.plugin_name }</span>
                                            {plugin?.id === option.id && <i className='fa-solid fa-check ml-' />}
                                        </Dropdown.Item>
                                    </abbr>
                                ))}
                            </div>
                        </Dropdown.Menu> 
                    </Dropdown>
                </div> 
            </div>
            

                {(cms || websiteType || websiteCategory || subCategory || theme || plugin) ? 
                    <div className='mt-3'>
                        <h6 className='mb-2'>Applied filteres: </h6>
                        <div className='d-flex flex-wrap align-items-center' style={{gap: '4px'}}>
                            { cms && 
                                <div className='filter-item'>   
                                    <span ><span className='f-12 '>Website CMS: </span> <span className='font-weight-bold'>{cms?.cms_name} </span> </span>
                                    <button onClick={() => setCms(null)}> 
                                    <i className='fa-solid fa-xmark' /> 
                                    </button> 
                                </div>
                            }
                            { websiteType && 
                                <div className='filter-item'>  
                                    <span ><span className='f-12 '>Website type: </span> <span className='font-weight-bold'>{websiteType?.website_type} </span> </span>
                                    <button onClick={() => setWebsiteType(null)}> 
                                        <i className='fa-solid fa-xmark' /> 
                                    </button> 
                                </div>
                            }

                            { websiteCategory && 
                                <div className='filter-item'> 
                                
                                <span >
                                    <span className='f-12 '>Niche Category: </span> <span className='font-weight-bold'>{websiteCategory?.category_name}  </span> 
                                </span> 
                                    
                                    <button onClick={() => setWebsiteCategory(null)}> 
                                            <i className='fa-solid fa-xmark' /> 
                                    </button> 
                                </div>
                            }
                            { subCategory && 
                            <div className='filter-item'> 
                                <span>
                                    <span className='f-12 '>Sub Niche Category: </span> <span className='font-weight-bold'>{subCategory?.category_name} </span> 
                                </span> 
                            
                                <button onClick={() => setSubCategory(null)}> 
                                    <i className='fa-solid fa-xmark' /> 
                                </button> 
                            </div>
                            }
                            { theme && 
                                <div className='filter-item'> 
                                    <span>
                                        <span className='f-12 '>Theme: </span> <span className='font-weight-bold'>{theme?.theme_name}  </span> 
                                    </span> 
                                    <button onClick={() => setTheme(null)}> 
                                        <i className='fa-solid fa-xmark' /> 
                                    </button> 
                                </div>
                            }

                            { plugin &&
                                <div className='filter-item'>   
                                    <span>
                                        <span className='f-12 '>Plugin: </span> <span className='font-weight-bold'>{plugin?.plugin_name} </span> 
                                    </span> 
                                    <button onClick={() => setPlugin(null)}> 
                                        <i className='fa-solid fa-xmark' /> 
                                    </button> 
                                </div>
                                }
                        </div>
                    </div>
                : null}

            <div className='row py-3'>
                {
                    (dataLoading || filterMenuIsLoading) ?
                    _.times(pageSize, (n) =>
                        <div className="col-4 mb-2" key={n}>
                            <ItemLoader />
                        </div>
                    ) :
                    (!dataLoading && _.size(portfolio?.data) === 0 && (cms || websiteType || websiteCategory || subCategory || theme || plugin)) ?
                            <div className='d-flex flex-column align-items-center justify-content-center w-100' style={{height: '30vh'}}>
                                <div><svg width="130" height="130" viewBox="0 0 80 80"><g fill="none" fillRule="evenodd"><path d="M0 0h80v80H0z"></path><g stroke="#C7C7C7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M75 21.5V30M75 37v30.5a1.5 1.5 0 0 1-1.5 1.5h-67A1.5 1.5 0 0 1 5 67.5V41M5 36.264v-2.57M13 33h12M13 46h12M13 59h12"></path><g><path d="M34 33h12M34 46h12M34 59h12"></path></g><g><path d="M55 33h12M55 46h12M55 59h12"></path></g><path fill="#CBCCCD" d="M6.5 12h67a1.5 1.5 0 0 1 1.5 1.5V22H5v-8.5A1.5 1.5 0 0 1 6.5 12z"></path></g></g></svg></div>
                                <div className='font-weight-bold text-center' style={{color: '#919191'}}>No data found after applying selected filters, please customize filters</div>
                            </div>
                    : (!dataLoading && _.size(portfolio?.data) === 0) ?
                        <div className='d-flex flex-column align-items-center justify-content-center w-100' style={{height: '30vh'}}>
                            <div><svg width="130" height="130" viewBox="0 0 80 80"><g fill="none" fillRule="evenodd"><path d="M0 0h80v80H0z"></path><g stroke="#C7C7C7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M75 21.5V30M75 37v30.5a1.5 1.5 0 0 1-1.5 1.5h-67A1.5 1.5 0 0 1 5 67.5V41M5 36.264v-2.57M13 33h12M13 46h12M13 59h12"></path><g><path d="M34 33h12M34 46h12M34 59h12"></path></g><g><path d="M55 33h12M55 46h12M55 59h12"></path></g><path fill="#CBCCCD" d="M6.5 12h67a1.5 1.5 0 0 1 1.5 1.5V22H5v-8.5A1.5 1.5 0 0 1 6.5 12z"></path></g></g></svg></div>
                            <div className='font-weight-bold text-center' style={{color: '#919191'}}>No Data Available</div>
                        </div>
                    :
                    _.map(portfolio?.data, item => (
                        <div className="col-12 col-md-4 mb-2" key={item.id}>
                            <PortfolioItem 
                                id={item?.id}
                                isLoading={dataLoading}
                                url={item?.portfolio_link?.toLowerCase()}
                            />
                        </div>
                    )) 
                    
                } 
            </div>


            {/* pagination */}
            <div>
                <Pagination
                    currentPage = {pageIndex}
                    perpageRow = {portfolio?.per_page}
                    onPaginate = {(v) => setPageIndex(v)}
                    totalEntry = {portfolio?.total}
                    onNext = {() => setPageIndex(prev => prev + 1)}
                    disableNext = {!portfolio?.next_page_url}
                    onPrevious = {() => setPageIndex(prev => prev - 1)} 
                    disablePrevious = {!portfolio?.prev_page_url}
                    totalPages=  {portfolio?.last_page}
                    onPageSize={ v => setPageSize(v)}
                />
            </div>
        </section>
    ) 
}

export default Portfolio


const ItemLoader = () => {
    return(
        <Placeholder height="38px" className='portfolio-item' />
    )
}