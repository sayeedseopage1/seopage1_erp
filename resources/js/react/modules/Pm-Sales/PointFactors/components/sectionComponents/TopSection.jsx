import { ButtonComponent, ButtonWrapper, TopSectionCointainer } from '../Styles/ui/ui';
import SearchBox from '../SearchBox';

const TopSection = ({ tab, setTab, search, setSearch }) => {

    return (
        <TopSectionCointainer>
            <ButtonWrapper>
                <ButtonComponent color={tab === 1 ? "#1492E6" : undefined} textColor={tab === 1 ? "#fff" : undefined} onClick={() => setTab(1)}>Fixed</ButtonComponent>
                <ButtonComponent color={tab === 2 ? "#1492E6" : undefined} textColor={tab === 2 ? "#fff" : undefined} onClick={() => setTab(2)}>Hourly</ButtonComponent>
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