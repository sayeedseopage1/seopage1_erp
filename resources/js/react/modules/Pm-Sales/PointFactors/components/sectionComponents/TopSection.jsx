import { ButtonComponent, ButtonWrapper, TopSectionCointainer } from '../Styles/ui/ui';
import SearchBox from '../SearchBox';

const TopSection = ({ tab, setTab, search, setSearch }) => {

    return (
        <TopSectionCointainer>
            <ButtonWrapper>
                <ButtonComponent color={tab === "fixed" ? "#1492E6" : undefined} textColor={tab === "fixed" ? "#fff" : undefined} onClick={() => setTab("fixed")}>Fixed</ButtonComponent>
                <ButtonComponent color={tab === "hourly" ? "#1492E6" : undefined} textColor={tab === "hourly" ? "#fff" : undefined} onClick={() => setTab("hourly")}>Hourly</ButtonComponent>
            </ButtonWrapper>
            <div style={{ width: "100%", maxWidth: "615px" }}>
                <SearchBox
                    value={search}
                    onChange={setSearch}
                />
            </div>
        </TopSectionCointainer>
    );
};

export default TopSection;