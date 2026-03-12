export const calculateGoalSIP = ({ presentCost, years, expectedReturn, inflation }) => {
    // Edge cases
    if (years === 0) return { fv: presentCost, sip: 0, totalInvestment: 0, wealthCreated: 0, chartData: [] };

    const r = expectedReturn / 100 / 12; // Monthly return
    const n = years * 12; // Total months
    const i = inflation / 100; // Annual inflation

    // Future Value due to inflation
    const fv = presentCost * Math.pow(1 + i, years);

    // Required SIP calculated based on future value
    let sip = 0;
    if (r === 0) {
        sip = fv / n;
    } else {
        // Standard SIP formula for Future Value (assuming investment at start of month)
        sip = (fv * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
    }

    const totalInvestment = sip * n;
    const wealthCreated = fv - totalInvestment;

    // Generate chart data showing investment growth over the years
    const chartData = [];
    let currentPortfolioValue = 0;
    let currentTotalInvested = 0;

    for (let year = 1; year <= years; year++) {
        const months = year * 12;
        currentTotalInvested = sip * months;

        // Future value of SIP made over 'year' years
        if (r === 0) {
            currentPortfolioValue = currentTotalInvested;
        } else {
            currentPortfolioValue = sip * (Math.pow(1 + r, months) - 1) / r * (1 + r);
        }

        const currentGoalCostInflation = presentCost * Math.pow(1 + i, year);

        chartData.push({
            year: `Year ${year}`,
            invested: Math.round(currentTotalInvested),
            portfolioValue: Math.round(currentPortfolioValue),
            goalCost: Math.round(currentGoalCostInflation),
        });
    }

    // Calculate comparison: What if you delay by 5 years?
    let delayedSip = 0;
    const delayedYears = Math.max(0, years - 5);
    if (delayedYears > 0) {
        const delayedMonths = delayedYears * 12;
        if (r === 0) {
            delayedSip = fv / delayedMonths;
        } else {
            delayedSip = (fv * r) / ((Math.pow(1 + r, delayedMonths) - 1) * (1 + r));
        }
    }

    return {
        fv: fv,
        sip: sip,
        totalInvestment: totalInvestment,
        wealthCreated: wealthCreated,
        delayedSip: delayedSip,
        delayedYears: 5,
        chartData: chartData
    };
};

export const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);
};

export const formatCurrencySimple = (value) => {
    if (value >= 10000000) {
        let cr = value / 10000000;
        return `₹${Number.isInteger(cr) ? cr : cr.toFixed(2)} Crore`;
    }
    if (value >= 100000) {
        let lakh = value / 100000;
        return `₹${Number.isInteger(lakh) ? lakh : lakh.toFixed(2)} Lakh`;
    }
    if (value >= 1000) {
        return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${Math.round(value)}`;
};
