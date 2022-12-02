import Tabs, { Tab } from "components/ui/Tabs";
import { Link, Outlet, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { todayAtom } from "data/atoms/common";
import { spendSearchConditionAtom } from "data/atoms/spend";

const SpendCare = () => {
  const today = useRecoilValue(todayAtom);
  const { month } = useRecoilValue(spendSearchConditionAtom);

  const spendMatched = useMatch("/spendCare");
  const incomeMatched = useMatch("/spendCare/income");
  return (
    <>
      {(spendMatched || incomeMatched) && (
        <Tabs>
          <Tab isActive={spendMatched}>
            <Link to="">소비</Link>
          </Tab>
          <Tab isActive={incomeMatched}>
            <Link to="income">수입</Link>
          </Tab>
        </Tabs>
      )}
      <Outlet context={[today, month]} />
    </>
  );
};

export default SpendCare;
