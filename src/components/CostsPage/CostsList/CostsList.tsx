import { ICosts } from "../../../types";
import { CostsItem } from "../CostsItem/CostsItem";

export const CostsList = ({ costs }: { costs: ICosts[] }) => {
  return (
    <ul className="list-group">
      {costs.map((cost, index) => (
        <CostsItem cost={cost} index={index + 1} key={cost._id} />
      ))}
    </ul>
  );
};
