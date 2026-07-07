import React from "react";
import Icon from "../Elements/Icon";

function ExpenseCard({ category, amount, percentage, trend, items }) {
  const trendIcon =
    trend === "up" ? (
      <Icon.ArrowUpRight size={16} />
    ) : (
      <Icon.ArrowDown size={16} />
    );

  const trendColor = trend === "up" ? "text-red-500" : "text-green-500";

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      {/* Header dengan kategori dan trend */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-600 text-sm mb-1">{category}</h3>
          <p className="text-2xl font-bold text-black">${amount}</p>
        </div>
        <div className={`flex items-center gap-1 ${trendColor}`}>
          <span className="text-sm font-semibold">{percentage}%</span>
          {trendIcon}
        </div>
      </div>

      {/* Trend comparison */}
      <p className="text-xs text-gray-500 mb-4">Compare to the last month</p>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Detail items */}
      <div className="space-y-3">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="text-gray-700 font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="font-semibold text-gray-900">${item.amount}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No items</p>
        )}
      </div>
    </div>
  );
}

export default ExpenseCard;
